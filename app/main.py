from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# 1. Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Customer Churn Prediction API",
    version="1.0.0"
)


# --------------------------------------------------
# 2. Enable CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# 3. Load trained model
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "customer_churn_model.pkl"

loaded_package = joblib.load(MODEL_PATH)

model = loaded_package["model"]
threshold = loaded_package["threshold"]


# --------------------------------------------------
# 4. Customer input schema
# --------------------------------------------------

class CustomerData(BaseModel):

    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


# --------------------------------------------------
# 5. Home endpoint
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "Customer Churn Prediction API is running"
    }


# --------------------------------------------------
# 6. Model information endpoint
# --------------------------------------------------

@app.get("/model-info")
def model_info():

    return {
        "model": "Balanced Logistic Regression",
        "threshold": threshold
    }


# --------------------------------------------------
# 7. Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict_churn(customer: CustomerData):

    # Convert input data into dictionary
    customer_data = customer.model_dump()

    # Convert dictionary into DataFrame
    input_data = pd.DataFrame([customer_data])

    # Get churn probability
    churn_probability = model.predict_proba(input_data)[0][1]

    # Apply selected threshold
    prediction = int(churn_probability >= threshold)

    # Convert probability to percentage
    churn_percentage = round(churn_probability * 100, 2)


    # Determine result
    if prediction == 1:

        result = "Customer likely to churn"

    else:

        result = "Customer likely to stay"


    # Determine risk level
    if churn_percentage >= 70:

        risk_level = "High"

    elif churn_percentage >= 40:

        risk_level = "Medium"

    else:

        risk_level = "Low"


    return {
        "churn_probability": churn_percentage,
        "prediction": prediction,
        "result": result,
        "risk_level": risk_level
    }