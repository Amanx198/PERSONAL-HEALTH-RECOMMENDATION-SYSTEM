import os
import json
from pydantic import BaseModel
from typing import List, Tuple
from openai import AsyncOpenAI
from models.schemas import DailyMealPlan, DailyWorkout, UserProfile, Meal

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy"))

class AIPlanResponse(BaseModel):
    meal_plan: List[DailyMealPlan]
    workout_plan: List[DailyWorkout]

async def generate_advanced_plans(profile: UserProfile, target_calories: int, macros: dict, goal: str) -> Tuple[List[DailyMealPlan], List[DailyWorkout]]:
    if not os.getenv("OPENAI_API_KEY"):
        print("No OPENAI_API_KEY found, using mock data")
        return _get_mock_plans()

    try:
        prompt = f"""
        You are an expert fitness and nutrition AI. 
        Create a 7-day meal plan and a 7-day workout routine for a user with the following profile:
        - Age: {profile.age}
        - Gender: {profile.gender}
        - Activity Level: {profile.activity_level}
        - Goal: {goal}
        - Diet Preference: {profile.diet_preference}
        
        Target Daily Nutrition:
        - Calories: {target_calories} kcal
        - Protein: {macros['protein_g']}g
        - Carbs: {macros['carbs_g']}g
        - Fat: {macros['fat_g']}g
        
        The meal plan should consist of breakfast, lunch, dinner, and a list of snacks for each day.
        The workout plan should be tailored to their goal and activity level (e.g., Push/Pull/Legs).
        Ensure the macros and calories roughly add up to the daily targets.
        """
        
        completion = await client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that outputs strictly in the provided JSON schema."},
                {"role": "user", "content": prompt}
            ],
            response_format=AIPlanResponse,
        )
        
        parsed = completion.choices[0].message.parsed
        return parsed.meal_plan, parsed.workout_plan
    except Exception as e:
        print(f"Error generating AI plans: {e}")
        return _get_mock_plans()

def _get_mock_plans() -> Tuple[List[DailyMealPlan], List[DailyWorkout]]:
    mock_meal = Meal(
        name="Oatmeal & Protein",
        calories=400,
        protein_g=30,
        carbs_g=50,
        fat_g=10,
        recipe_or_instructions="Mix 1/2 cup oats with water, microwave. Add 1 scoop protein powder and berries."
    )
    mock_lunch = Meal(
        name="Chicken Rice Bowl",
        calories=600,
        protein_g=45,
        carbs_g=70,
        fat_g=15,
        recipe_or_instructions="Grill 150g chicken breast. Serve with 1 cup cooked rice and steamed broccoli."
    )
    mock_dinner = Meal(
        name="Salmon & Sweet Potato",
        calories=550,
        protein_g=35,
        carbs_g=45,
        fat_g=25,
        recipe_or_instructions="Bake 120g salmon and 200g sweet potato. Add asparagus."
    )
    mock_snack = Meal(
        name="Greek Yogurt",
        calories=150,
        protein_g=15,
        carbs_g=10,
        fat_g=5,
        recipe_or_instructions="1 cup Greek yogurt with a drizzle of honey."
    )
    
    mock_daily_meal = DailyMealPlan(
        day=1,
        breakfast=mock_meal,
        lunch=mock_lunch,
        dinner=mock_dinner,
        snacks=[mock_snack]
    )
    
    meals = [mock_daily_meal.model_copy(update={'day': i}) for i in range(1, 8)]
    
    mock_workout = DailyWorkout(
        day=1,
        focus_area="Push (Chest, Shoulders, Triceps)",
        exercises=["Bench Press 3x10", "Overhead Press 3x10", "Tricep Extensions 3x12"],
        duration_minutes=45,
        intensity="Moderate"
    )
    
    workouts = [mock_workout.model_copy(update={'day': i}) for i in range(1, 8)]
    
    return meals, workouts
