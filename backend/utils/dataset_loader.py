import pandas as pd
from typing import Dict, Any

def load_dataset(path: str) -> Dict[str, Any]:
    try:
        df = pd.read_csv(path)
    except Exception as e:
        raise ValueError(f"Failed to load CSV: {e}")

    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    target_col = None
    for col in df.columns:
        if col in ["drop_out", "dropout", "dropped_out", "at_risk", "churn"]:
            target_col = col
            break
    if target_col is None and "completion_status" in df.columns:
        if df["completion_status"].dtype == object:
            df["drop_out"] = df["completion_status"].apply(
                lambda x: 0 if str(x).lower() in ["completed", "yes", "1", "true"] else 1
            )
            target_col = "drop_out"

    numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
    categorical_cols = df.select_dtypes(include=["object", "category"]).columns.tolist()

    df = df.fillna(df.median(numeric_only=True))
    for col in categorical_cols:
        df[col] = df[col].fillna("Unknown")

    return {
        "dataframe": df,
        "columns": df.columns.tolist(),
        "target_col": target_col,
        "numeric_cols": numeric_cols,
        "categorical_cols": categorical_cols,
        "row_count": len(df),
    }
