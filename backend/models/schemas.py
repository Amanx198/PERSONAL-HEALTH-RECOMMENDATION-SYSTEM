from pydantic import BaseModel
from typing import Optional, List

class UserProfile(BaseModel):
    age: int
    gender: str  # 'male' or 'female'
    height_cm: float
    weight_kg: float
    activity_level: str  # 'sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'
    diet_preference: Optional[str] = "Any"  # 'Vegetarian', 'Non-Vegetarian', 'Any'

class Macronutrients(BaseModel):
    protein_g: int
    carbs_g: int
    fat_g: int

class Meal(BaseModel):
    name: str
    calories: int
    protein_g: int
    carbs_g: int
    fat_g: int
    recipe_or_instructions: str

class DailyMealPlan(BaseModel):
    day: int
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snacks: List[Meal]

class DailyWorkout(BaseModel):
    day: int
    focus_area: str
    exercises: List[str]
    duration_minutes: int
    intensity: str

class RecommendationsResponse(BaseModel):
    bmi: float
    bmi_category: str
    healthy_weight_range: List[float]
    goal: str
    target_calories: int
    macronutrients: Macronutrients
    water_liters: float
    exercise_plan: str
    meal_plan: List[str]
    tips: List[str]
    health_risk_prediction: Optional[str] = None
    obesity_risk_prob: Optional[float] = None
    advanced_meal_plan: Optional[List[DailyMealPlan]] = None
    advanced_workout_plan: Optional[List[DailyWorkout]] = None
