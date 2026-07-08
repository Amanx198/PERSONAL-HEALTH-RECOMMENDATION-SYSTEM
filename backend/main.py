from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import UserProfile, RecommendationsResponse
from core.health_logic import calculate_bmi, get_bmi_category, calculate_bmr, calculate_tdee, get_recommendations
from ml.predictor import predict_health_risk

app = FastAPI(title="Personal Health Recommendation System")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Personal Health Recommendation System API"}

@app.post("/api/recommendations", response_model=RecommendationsResponse)
def get_health_recommendations(profile: UserProfile):
    try:
        bmi = calculate_bmi(profile.height_cm, profile.weight_kg)
        category = get_bmi_category(bmi)
        bmr = calculate_bmr(profile.weight_kg, profile.height_cm, profile.age, profile.gender)
        tdee = calculate_tdee(bmr, profile.activity_level)
        
        recs = get_recommendations(category, tdee, profile.weight_kg)
        
        # Calculate healthy weight range based on normal BMI (18.5 - 24.9)
        height_m = profile.height_cm / 100
        healthy_min_weight = round(18.5 * (height_m ** 2), 1)
        healthy_max_weight = round(24.9 * (height_m ** 2), 1)
        
        # Predict Health Risk using ML
        risk_category, risk_prob = predict_health_risk(
            age=profile.age,
            gender=profile.gender,
            height_cm=profile.height_cm,
            weight_kg=profile.weight_kg,
            activity_level=profile.activity_level
        )
        
        return RecommendationsResponse(
            bmi=bmi,
            bmi_category=category,
            healthy_weight_range=[healthy_min_weight, healthy_max_weight],
            goal=recs["goal"],
            target_calories=recs["target_calories"],
            macronutrients=recs["macronutrients"],
            water_liters=recs["water_liters"],
            exercise_plan=recs["exercise_plan"],
            tips=recs["tips"],
            health_risk_prediction=risk_category,
            obesity_risk_prob=round(risk_prob, 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
