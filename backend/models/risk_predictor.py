import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, f1_score
from typing import Dict, Any, List

class RiskPredictor:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.accuracy = 0.0
        self.f1 = 0.0
        self.feature_names: List[str] = []
        self.importances: Dict[str, float] = {}
        self.dataset_size = 0
        self.predictions: List[Dict[str, Any]] = []

    def train(self, df: pd.DataFrame, target_col: str = "drop_out") -> Dict[str, Any]:
        df = df.copy()
        if target_col not in df.columns:
            possible = [c for c in df.columns if "drop" in c or "churn" in c or "risk" in c]
            if possible:
                target_col = possible[0]
            else:
                raise ValueError("Target column not found")

        y = df[target_col].astype(int)
        X = df.drop(columns=[target_col])

        id_cols = [c for c in X.columns if c in ["student_id", "id", "name", "email"]]
        X = X.drop(columns=id_cols, errors="ignore")

        cat_cols = X.select_dtypes(include=["object", "category"]).columns.tolist()
        num_cols = X.select_dtypes(include=["number"]).columns.tolist()

        numeric_transformer = Pipeline(steps=[("imputer", SimpleImputer(strategy="median"))])
        categorical_transformer = Pipeline(steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
        ])

        self.preprocessor = ColumnTransformer(
            transformers=[
                ("num", numeric_transformer, num_cols),
                ("cat", categorical_transformer, cat_cols),
            ]
        )

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

        clf = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42, class_weight="balanced")
        self.model = Pipeline(steps=[("preprocessor", self.preprocessor), ("classifier", clf)])
        self.model.fit(X_train, y_train)

        y_pred = self.model.predict(X_test)
        self.accuracy = round(accuracy_score(y_test, y_pred) * 100, 2)
        self.f1 = round(f1_score(y_test, y_pred, zero_division=0) * 100, 2)
        self.dataset_size = len(df)

        ohe = self.model.named_steps["preprocessor"].named_transformers_["cat"].named_steps["onehot"]
        cat_features = ohe.get_feature_names_out(cat_cols).tolist() if cat_cols else []
        self.feature_names = num_cols + cat_features

        importances = self.model.named_steps["classifier"].feature_importances_
        self.importances = dict(sorted(zip(self.feature_names, importances), key=lambda x: x[1], reverse=True))

        proba = self.model.predict_proba(X)[:, 1]
        X_full = X.reset_index(drop=True)
        y_full = y.reset_index(drop=True)

        self.predictions = []
        for idx in range(len(df)):
            row = X_full.iloc[idx]
            risk = float(proba[idx]) * 100
            reasons, intervention = self._reasons_and_intervention(row, risk)
            self.predictions.append({
                "index": idx,
                "risk_score": round(risk, 1),
                "risk_badge": "red" if risk > 70 else ("yellow" if risk > 40 else "green"),
                "predicted_reason": reasons,
                "recommended_intervention": intervention,
                "drop_out_actual": int(y_full.iloc[idx]),
            })

        return {
            "model_name": "RandomForestClassifier",
            "model_type": "Classification",
            "accuracy": self.accuracy,
            "f1_score": self.f1,
            "dataset_size": self.dataset_size,
            "features_used": len(self.feature_names),
        }

    def _reasons_and_intervention(self, row: pd.Series, risk: float) -> tuple:
        reasons = []
        if "attendance_rate" in row and row["attendance_rate"] < 0.6:
            reasons.append("Low attendance")
        if "engagement_hours" in row and row["engagement_hours"] < 5:
            reasons.append("Low engagement")
        if "assignment_avg" in row and row["assignment_avg"] < 50:
            reasons.append("Declining assignment scores")
        if "forum_posts" in row and row["forum_posts"] < 2:
            reasons.append("Minimal forum participation")
        if "completed_assignments" in row and "total_assignments" in row:
            if row["completed_assignments"] / max(row["total_assignments"], 1) < 0.5:
                reasons.append("Incomplete assignments")

        if not reasons:
            if risk > 70:
                reasons.append("Multiple subtle risk factors aggregated by the model")
            else:
                reasons.append("Early warning signals detected")

        reason_str = " + ".join(reasons)

        if "Low attendance" in reason_str:
            intervention = "Schedule 1-on-1 mentoring and set attendance goals."
        elif "Low engagement" in reason_str and "assignment" in reason_str.lower():
            intervention = "Move to part-time track and assign a peer study group."
        elif "forum" in reason_str.lower():
            intervention = "Recommend peer study group and gamify forum participation."
        else:
            intervention = "Proactive check-in with instructor and personalized goal setting."

        return reason_str, intervention
