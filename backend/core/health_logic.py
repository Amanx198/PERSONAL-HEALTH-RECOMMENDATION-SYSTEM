def calculate_bmi(height_cm: float, weight_kg: float) -> float:
    if height_cm <= 0:
        return 0.0
    height_m = height_cm / 100.0
    return round(weight_kg / (height_m ** 2), 2)

def get_bmi_category(bmi: float) -> str:
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    else:
        return "Obesity"

def calculate_bmr(weight_kg: float, height_cm: float, age_years: int, gender: str) -> float:
    # Mifflin-St Jeor Equation
    if gender.lower() == 'male':
        return (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) + 5
    else:
        return (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) - 161

def calculate_tdee(bmr: float, activity_level: str) -> float:
    multipliers = {
        'sedentary': 1.2,          # Little or no exercise
        'lightly_active': 1.375,   # Light exercise/sports 1-3 days/week
        'moderately_active': 1.55, # Moderate exercise/sports 3-5 days/week
        'very_active': 1.725,      # Hard exercise/sports 6-7 days a week
        'extra_active': 1.9        # Very hard exercise/sports & physical job or 2x training
    }
    return bmr * multipliers.get(activity_level.lower(), 1.2)

def get_recommendations(bmi_category: str, tdee: float, weight_kg: float) -> dict:
    target_calories = tdee
    goal = "Maintain Weight"
    protein_g_per_kg = 1.0
    fat_percentage = 0.3
    
    if bmi_category == "Underweight":
        target_calories = tdee + 500  # Surplus
        goal = "Weight Gain"
        protein_g_per_kg = 1.5
        exercise_plan = "Focus on strength training (hypertrophy) 3-4 times a week. Minimize excessive cardio."
        tips = ["Eat nutrient-dense foods like nuts, avocados, and whole grains.", "Add liquid calories like smoothies.", "Eat more frequently."]
    elif bmi_category == "Overweight" or bmi_category == "Obesity":
        target_calories = tdee - 500  # Deficit
        goal = "Weight Loss"
        protein_g_per_kg = 1.8  # Higher protein to preserve muscle during deficit
        exercise_plan = "Combine cardio (150 min/week) with strength training (2-3 times/week) to preserve muscle mass."
        tips = ["Focus on high-volume, low-calorie foods (vegetables, lean proteins).", "Track your daily caloric intake.", "Stay hydrated to manage hunger."]
    else:
        target_calories = tdee  # Maintenance
        goal = "Maintain Weight"
        protein_g_per_kg = 1.2
        exercise_plan = "Maintain a balanced routine: 150 minutes of moderate cardio and 2 days of strength training per week."
        tips = ["Focus on a balanced diet of whole foods.", "Ensure adequate sleep (7-9 hours).", "Stay active daily."]

    # Macronutrient breakdown
    protein_grams = weight_kg * protein_g_per_kg
    protein_calories = protein_grams * 4
    
    fat_calories = target_calories * fat_percentage
    fat_grams = fat_calories / 9
    
    carb_calories = target_calories - (protein_calories + fat_calories)
    carb_grams = carb_calories / 4 if carb_calories > 0 else 0
    
    water_liters = weight_kg * 0.033  # ~33ml per kg
    
    # Healthy weight range (BMI 18.5 - 24.9)
    # bmi = weight / height^2  => weight = bmi * height^2
    # but we don't have height here. Let's compute that upstream or pass height.
    # We will pass it from the API endpoint instead.
    
    return {
        "goal": goal,
        "target_calories": round(target_calories),
        "macronutrients": {
            "protein_g": round(protein_grams),
            "carbs_g": round(carb_grams),
            "fat_g": round(fat_grams)
        },
        "water_liters": round(water_liters, 1),
        "exercise_plan": exercise_plan,
        "tips": tips
    }
