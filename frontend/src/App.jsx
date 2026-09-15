import React, { useState } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';
import HealthForm from './components/HealthForm';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async (profileData) => {
    setIsLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiUrl}/api/recommendations`, profileData);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while fetching recommendations. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-200 overflow-x-hidden font-sans">
      <nav className="w-full py-6 px-4 md:px-8 flex items-center gap-3 max-w-6xl mx-auto">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
          <Activity size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">Vitality<span className="text-blue-600">AI</span></span>
      </nav>

      <main className="container mx-auto px-4 pb-20 relative z-10 mt-8 md:mt-12">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-purple-400/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

        {!results ? (
          <div className="flex flex-col items-center">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                AI-Powered <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Health Insights</span>
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Enter your details below to receive a personalized nutrition plan, exercise routine, and a machine learning-backed health risk assessment.
              </p>
            </div>
            
            {error && (
              <div className="w-full max-w-lg mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-medium text-center">
                {error}
              </div>
            )}
            
            <HealthForm onSubmit={fetchRecommendations} isLoading={isLoading} />
          </div>
        ) : (
          <ResultsDashboard data={results} onBack={() => setResults(null)} />
        )}
      </main>

      <footer className="w-full py-8 border-t border-slate-200/60 mt-auto">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.linkedin.com/in/aman-sharma-307744319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com/amanx198" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.375 3.375 0 0 0-.975-2.438 3.75 3.75 0 0 1 .6-6.438c.6-.1 1.2 0 1.8.1.6 0 1.2.1 1.8.1a3.75 3.75 0 0 1 .6 6.438 3.375 3.375 0 0 0-.975 2.438v3.87M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.375 3.375 0 0 0-.975-2.438 3.75 3.75 0 0 1 .6-6.438c.6-.1 1.2 0 1.8.1.6 0 1.2.1 1.8.1a3.75 3.75 0 0 1 .6 6.438 3.375 3.375 0 0 0-.975 2.438v3.87"/>
            </svg>
          </a>
          <a href="https://x.com/Amanx5002" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 9-7 9-7"/>
            </svg>
          </a>
          <a href="mailto:amanx500270@gmail.com" className="text-slate-400 hover:text-red-500 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
        <p className="text-center text-slate-500 text-sm font-medium">&copy; 2025 Aman Sharma. Built with Netflix vibes.</p>
      </footer>
    </div>
  );
}

export default App;
