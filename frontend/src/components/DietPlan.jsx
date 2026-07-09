import React, { useState } from 'react';
import { Leaf, Drumstick, CalendarDays, ArrowLeft, Utensils } from 'lucide-react';

const generateDetailedPlan = (isVeg) => {
  const plan = [];
  for (let i = 1; i <= 7; i++) {
    plan.push({
      day: i,
      meals: {
        breakfast: {
          name: isVeg ? 'Oatmeal with Nuts & Berries' : 'Scrambled Eggs & Whole Wheat Toast',
          recipe_or_instructions: isVeg 
            ? 'Boil oats in almond milk. Top with mixed berries, chia seeds, and walnuts.'
            : 'Scramble 3 eggs with spinach. Serve with 2 slices of whole wheat toast.',
          calories: 350, protein_g: isVeg ? 12 : 24, carbs_g: 45, fat_g: 14
        },
        lunch: {
          name: isVeg ? 'Quinoa Chickpea Salad' : 'Grilled Chicken Salad',
          recipe_or_instructions: isVeg
            ? 'Mix cooked quinoa, chickpeas, cucumbers, tomatoes, and a lemon-tahini dressing.'
            : 'Toss mixed greens, cherry tomatoes, and cucumbers with 150g grilled chicken breast.',
          calories: 450, protein_g: isVeg ? 18 : 35, carbs_g: 55, fat_g: 16
        },
        dinner: {
          name: isVeg ? 'Lentil Soup & Whole Wheat Bread' : 'Baked Salmon with Asparagus',
          recipe_or_instructions: isVeg
            ? 'Simmer lentils with carrots, celery, and spices. Serve with a slice of bread.'
            : 'Bake 150g salmon fillet with lemon and garlic. Serve with roasted asparagus.',
          calories: 400, protein_g: isVeg ? 22 : 30, carbs_g: 50, fat_g: 12
        }
      }
    });
  }
  return plan;
};

const vegPlan = generateDetailedPlan(true);
const nonVegPlan = generateDetailedPlan(false);

const DietPlan = () => {
  const [preference, setPreference] = useState(null); // 'veg' or 'non-veg'
  const [activeDay, setActiveDay] = useState(1);

  const plan = preference === 'veg' ? vegPlan : nonVegPlan;

  const handleSelect = (pref) => {
    setPreference(pref);
    setActiveDay(1);
  };

  if (preference) {
    const currentDayPlan = plan.find(p => p.day === activeDay);

    return (
      <div className="w-full animate-in fade-in zoom-in duration-500 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-8">
        <button 
          onClick={() => setPreference(null)}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Change Preference
        </button>
        
        <div className="flex items-center gap-3 text-slate-800 font-bold text-2xl mb-6">
          <div className={`p-2 rounded-xl ${preference === 'veg' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <CalendarDays size={24} />
          </div>
          Your 7-Day {preference === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Diet Plan
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeDay === day 
                  ? (preference === 'veg' ? 'bg-green-600 shadow-green-600/20' : 'bg-red-600 shadow-red-600/20') + ' text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        {/* Meal Plan for Active Day */}
        <div className="w-full">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
            <Utensils size={20} className="text-orange-500"/> Meals for Day {activeDay}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['breakfast', 'lunch', 'dinner'].map(mealType => {
              const meal = currentDayPlan.meals[mealType];
              return (
                <div key={mealType} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{mealType}</div>
                  <div className="font-bold text-slate-800 mb-2 text-lg">{meal.name}</div>
                  <div className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed">{meal.recipe_or_instructions}</div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold mt-auto pt-4 border-t border-slate-200">
                    <span className="text-orange-600 bg-orange-100 px-2 py-1.5 rounded-md">{meal.calories} kcal</span>
                    <span className="text-blue-600 bg-blue-100 px-2 py-1.5 rounded-md">{meal.protein_g}g Pro</span>
                    <span className="text-emerald-600 bg-emerald-100 px-2 py-1.5 rounded-md">{meal.carbs_g}g Carb</span>
                    <span className="text-amber-600 bg-amber-100 px-2 py-1.5 rounded-md">{meal.fat_g}g Fat</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-in fade-in duration-500 text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Select Your Diet Preference</h2>
      <p className="text-slate-600 mb-8">Choose vegetarian or non-vegetarian to generate your personalized 7-day meal plan complete with recipes and macro breakdowns.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button 
          onClick={() => handleSelect('veg')}
          className="group flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-green-500 hover:bg-green-50 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Leaf size={40} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Vegetarian</h3>
          <p className="text-sm text-slate-500">Plant-based meals, dairy, and wholesome greens.</p>
        </button>

        <button 
          onClick={() => handleSelect('non-veg')}
          className="group flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-red-500 hover:bg-red-50 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Drumstick size={40} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Non-Vegetarian</h3>
          <p className="text-sm text-slate-500">Includes lean meats, poultry, fish, and eggs.</p>
        </button>
      </div>
    </div>
  );
};

export default DietPlan;
