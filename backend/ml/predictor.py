import pickle
import os
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'risk_model.pkl')
_model = None

def load_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError("Model not found. Please run train_model.py first.")
        with open(MODEL_PATH, 'rb') as f:
            _model = pickle.load(f)
    return _model

def predict_health_risk(age: int, gender: str, height_cm: float, weight_kg: float, activity_level: str) -> tuple[str, float]:
    """
    Returns (risk_category, probability_of_high_risk)
    """
    model = load_model()
    
    # Map inputs to model format
    gender_map = {'male': 1, 'female': 0}
    gender_val = gender_map.get(gender.lower(), 0)
    
    activity_map = {
        'sedentary': 0,
        'lightly_active': 1,
        'moderately_active': 2,
        'very_active': 3,
        'extra_active': 4
    }
    activity_val = activity_map.get(activity_level.lower(), 0)
    
    # Create DataFrame to ensure feature names match training
    input_data = pd.DataFrame([{
        'age': age,
        'gender': gender_val,
        'height_cm': height_cm,
        'weight_kg': weight_kg,
        'activity_level': activity_val
    }])
    
    prob = model.predict_proba(input_data)[0][1] # Probability of class 1 (High Risk)
    
    risk_category = "Elevated Risk (Metabolic/Obesity)" if prob > 0.5 else "Low/Normal Risk"
    
    return risk_category, float(prob)
