from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import pandas as pd
from io import StringIO
from typing import List, Dict, Any

from models.path_generator import PathGenerator, OnboardingInput
import os
from models.risk_predictor import RiskPredictor
from utils.dataset_loader import load_dataset
from utils.config import UPLOAD_DIR, DEMO_DATA_PATH

app = FastAPI(title="AtomCamp Smart LMS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

last_model_info: Dict[str, Any] = {}
last_predictions: List[Dict[str, Any]] = []
last_df_columns: List[str] = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate-path")
def generate_path(profile: OnboardingInput):
    try:
        gen = PathGenerator()
        result = gen.generate(profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-dataset")
def upload_dataset(file: UploadFile = File(...)):
    try:
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in [".csv"]:
            raise HTTPException(status_code=400, detail="Only CSV files allowed")
        dest = os.path.join(UPLOAD_DIR, file.filename)
        with open(dest, "wb") as f:
            f.write(file.file.read())
        info = load_dataset(dest)
        global last_df_columns
        last_df_columns = info["columns"]
        return {
            "message": "Uploaded successfully",
            "path": dest,
            "columns": info["columns"],
            "row_count": info["row_count"],
            "preview": info["dataframe"].head(5).to_dict(orient="records"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
def analyze(payload: Dict[str, Any]):
    try:
        file_path = payload.get("file_path", DEMO_DATA_PATH)
        if not os.path.exists(file_path):
            alt = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "demo-data", "sample_students.csv")
            if os.path.exists(alt):
                file_path = alt
            else:
                raise HTTPException(status_code=404, detail="Dataset not found")

        info = load_dataset(file_path)
        df = info["dataframe"]
        target = info["target_col"] or "drop_out"

        predictor = RiskPredictor()
        model_info = predictor.train(df, target_col=target)

        global last_model_info, last_predictions
        last_model_info = model_info
        last_predictions = predictor.predictions

        records = df.head(50).to_dict(orient="records")
        for i, rec in enumerate(records):
            if i < len(predictor.predictions):
                rec.update(predictor.predictions[i])

        return {
            "model_info": model_info,
            "feature_importance": predictor.importances,
            "students": records,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/model-info")
def model_info():
    if not last_model_info:
        raise HTTPException(status_code=400, detail="No model trained yet. Call /analyze first.")
    return last_model_info

@app.post("/export-interventions")
def export_interventions(payload: Dict[str, Any]):
    try:
        file_path = payload.get("file_path", DEMO_DATA_PATH)
        info = load_dataset(file_path)
        df = info["dataframe"]
        target = info["target_col"] or "drop_out"

        predictor = RiskPredictor()
        predictor.train(df, target_col=target)

        out_df = df.copy()
        out_df["risk_score"] = [p["risk_score"] for p in predictor.predictions]
        out_df["risk_badge"] = [p["risk_badge"] for p in predictor.predictions]
        out_df["predicted_reason"] = [p["predicted_reason"] for p in predictor.predictions]
        out_df["recommended_intervention"] = [p["recommended_intervention"] for p in predictor.predictions]

        stream = StringIO()
        out_df.to_csv(stream, index=False)
        stream.seek(0)
        return StreamingResponse(stream, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=interventions.csv"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
