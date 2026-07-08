import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    
    age = np.random.randint(18, 80, num_samples)
    gender = np.random.choice([0, 1], num_samples) # 0: Female, 1: Male
    height_cm = np.random.normal(170, 10, num_samples)
    weight_kg = np.random.normal(75, 15, num_samples)
    
    # Activity level map: 0: Sedentary, 1: Light, 2: Moderate, 3: Very, 4: Extra
    activity = np.random.randint(0, 5, num_samples)
    
    # Calculate actual BMI for synthetic logic
    bmi = weight_kg / ((height_cm / 100) ** 2)
    
    # Synthetic target: "High Risk" (1) if BMI > 30 OR (BMI > 27 and Age > 45 and activity < 2)
    high_risk = ((bmi >= 30) | ((bmi >= 27) & (age >= 45) & (activity < 2))).astype(int)
    
    # Add some noise for realism
    noise = np.random.choice([0, 1], num_samples, p=[0.95, 0.05])
    target = np.logical_xor(high_risk, noise).astype(int)
    
    df = pd.DataFrame({
        'age': age,
        'gender': gender,
        'height_cm': height_cm,
        'weight_kg': weight_kg,
        'activity_level': activity,
        'high_risk': target
    })
    
    return df

def train_and_save_model():
    print("Generating synthetic data...")
    df = generate_synthetic_data(3000)
    
    X = df.drop('high_risk', axis=1)
    y = df['high_risk']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForest model...")
    model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    print(f"Model trained. Accuracy on test set: {accuracy:.2f}")
    
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), 'risk_model.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
        
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_and_save_model()
