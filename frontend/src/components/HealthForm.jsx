import React, { useState } from 'react';
import { Activity, User, Scale, Ruler, Calendar } from 'lucide-react';

const HealthForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height_cm: '',
    weight_kg: '',
    activity_level: 'sedentary',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: parseInt(formData.age),
      height_cm: parseFloat(formData.height_cm),
      weight_kg: parseFloat(formData.weight_kg),
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white w-full max-w-lg mx-auto transform transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
          <User size={20} />
        </div>
        Your Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" /> Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              max="120"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700"
              placeholder="Years"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Ruler size={16} className="text-slate-400" /> Height (cm)
            </label>
            <input
              type="number"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleChange}
              required
              min="100"
              max="250"
              step="0.1"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700"
              placeholder="e.g. 175"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Scale size={16} className="text-slate-400" /> Weight (kg)
            </label>
            <input
              type="number"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
              required
              min="30"
              max="300"
              step="0.1"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700"
              placeholder="e.g. 70"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Activity size={16} className="text-slate-400" /> Activity Level
          </label>
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700"
          >
            <option value="sedentary">Sedentary (Little or no exercise)</option>
            <option value="lightly_active">Lightly Active (Exercise 1-3 days/week)</option>
            <option value="moderately_active">Moderately Active (Exercise 3-5 days/week)</option>
            <option value="very_active">Very Active (Exercise 6-7 days/week)</option>
            <option value="extra_active">Extra Active (Very hard exercise/physical job)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-6 bg-slate-900 text-white rounded-xl font-semibold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            "Get Personalized Plan"
          )}
        </button>
      </form>
    </div>
  );
};

export default HealthForm;
