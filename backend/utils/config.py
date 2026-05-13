import os

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
DEMO_DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "public", "demo-data", "sample_students.csv")
os.makedirs(UPLOAD_DIR, exist_ok=True)
