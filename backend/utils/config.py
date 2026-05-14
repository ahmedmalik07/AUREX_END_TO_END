import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
DEMO_DATA_PATH = os.path.join(BASE_DIR, "data", "sample_students.csv")
os.makedirs(UPLOAD_DIR, exist_ok=True)
