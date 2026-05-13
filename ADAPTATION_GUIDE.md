# Adaptation Guide — Switching to the Real Dataset

When the organizers provide the official CSV, change exactly these **3 lines**:

## 1. Backend demo path
**File:** `backend/utils/config.py`  
**Line 4:** Replace the demo path with the absolute path to the provided CSV.

```python
# BEFORE
DEMO_DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "public", "demo-data", "sample_students.csv")

# AFTER (example)
DEMO_DATA_PATH = "/path/to/real_atomcamp_dataset.csv"
```

## 2. Disable auto-load of demo data on the Instructor page
**File:** `frontend/components/DatasetUploader.tsx`  
**Lines 16-19:** Comment out the `useEffect` that calls `analyzeDemo()` on mount.

```tsx
// useEffect(() => {
//   analyzeDemo()
// }, [])
```

Then users will only see data after they upload the real CSV.

## 3. Match the real target column name
**File:** `backend/models/risk_predictor.py`  
**Line 13:** Update the default target column if the dataset uses a different label.

```python
# BEFORE
def train(self, df: pd.DataFrame, target_col: str = "drop_out") -> Dict[str, Any]:

# AFTER (example)
def train(self, df: pd.DataFrame, target_col: str = "at_risk") -> Dict[str, Any]:
```

The `dataset_loader.py` auto-detects schema, handles missing values, encodes categoricals, and imputes automatically — no other changes needed.
