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
      const response = await axios.post('http://127.0.0.1:8000/api/recommendations', profileData);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while fetching recommendations. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200 overflow-x-hidden font-sans">
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
    </div>
  );
}

export default App;
