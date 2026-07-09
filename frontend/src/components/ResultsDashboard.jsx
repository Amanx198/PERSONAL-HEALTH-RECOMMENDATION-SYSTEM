import React, { useState } from 'react';
import { Target, Droplets, Utensils, Activity, AlertTriangle, ArrowLeft, Calendar, Flame, Dumbbell } from 'lucide-react';
import DietPlan from './DietPlan';

const ResultsDashboard = ({ data, onBack }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 font-medium"
      >
        <ArrowLeft size={18} />
        Back to Profile
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Status Card */}
        <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-900/20">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-slate-400 font-medium mb-1">Your Goal</p>
              <h2 className="text-3xl font-bold tracking-tight">{data.goal}</h2>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-medium mb-1">BMI</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold tracking-tight">{data.bmi}</span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  data.bmi_category === 'Normal' ? 'bg-emerald-500/20 text-emerald-300' :
                  data.bmi_category === 'Underweight' ? 'bg-blue-500/20 text-blue-300' :
                  data.bmi_category === 'Overweight' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {data.bmi_category}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/5 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-2 text-blue-200 mb-2 font-medium">
                <Target size={20} /> Target Calories
              </div>
              <div className="text-3xl font-bold">{data.target_calories} <span className="text-base font-normal text-slate-400">kcal</span></div>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 border border-white/5 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-2 text-blue-200 mb-2 font-medium">
                <Droplets size={20} /> Daily Water
              </div>
              <div className="text-3xl font-bold">{data.water_liters} <span className="text-base font-normal text-slate-400">L</span></div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-slate-400 bg-white/5 rounded-xl p-4 border border-white/5">
            Healthy weight range for your height: <span className="font-semibold text-white">{data.healthy_weight_range[0]} kg - {data.healthy_weight_range[1]} kg</span>
          </div>
        </div>

        {/* Macros Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xl mb-8">
              <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
                <Utensils size={20} />
              </div>
              Macros
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600">Protein</span>
                  <span className="text-slate-900">{data.macronutrients.protein_g}g</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600">Carbs</span>
                  <span className="text-slate-900">{data.macronutrients.carbs_g}g</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600">Fats</span>
                  <span className="text-slate-900">{data.macronutrients.fat_g}g</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exercise Plan */}
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 text-slate-800 font-bold text-xl mb-6">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <Activity size={20} />
            </div>
            Action Plan
          </div>
          <p className="text-slate-700 leading-relaxed mb-6 font-medium">
            {data.exercise_plan}
          </p>
          <div className="space-y-4">
            {data.tips.map((tip, i) => (
              <div key={i} className="flex gap-4 text-slate-600 items-start">
                <div className="w-2 h-2 rounded-full bg-slate-800 mt-2 shrink-0"></div>
                <p className="leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ML Risk Prediction */}
        <div className={`rounded-[2rem] p-8 border ${
          data.obesity_risk_prob > 0.5 
            ? 'bg-red-50/50 border-red-100' 
            : 'bg-emerald-50/50 border-emerald-100'
        }`}>
          <div className="flex items-center gap-3 text-slate-800 font-bold text-xl mb-6">
            <div className={`p-2 rounded-xl ${data.obesity_risk_prob > 0.5 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <AlertTriangle size={20} /> 
            </div>
            Health AI Analysis
          </div>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Based on our Machine Learning model trained on health data, here is your risk profile for metabolic/obesity conditions:
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-slate-600">Risk Assessment</span>
              <span className={`font-bold px-3 py-1 rounded-lg ${
                data.obesity_risk_prob > 0.5 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {data.health_risk_prediction}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 mb-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  data.obesity_risk_prob > 0.5 ? 'bg-red-500' : 'bg-emerald-500'
                }`} 
                style={{ width: `${Math.min(100, Math.max(0, data.obesity_risk_prob * 100))}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-slate-500 text-right">
              Model Confidence Score: <span className="text-slate-700">{(data.obesity_risk_prob * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Diet Plan Selector */}
      <div className="mt-8">
        <DietPlan />
      </div>
    </div>
  );
};

export default ResultsDashboard;
