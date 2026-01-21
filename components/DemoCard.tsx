import React, { useState } from 'react';
import { ExternalLink, Sparkles, Monitor, ArrowRight, Loader2 } from 'lucide-react';
import { DemoSite, AIInsightResponse } from '../types';
import { generateProductInsight } from '../services/geminiService';

interface DemoCardProps {
  demo: DemoSite;
}

export const DemoCard: React.FC<DemoCardProps> = ({ demo }) => {
  const [insight, setInsight] = useState<AIInsightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const handleGenerateInsight = async () => {
    if (insight) {
      setShowInsight(!showInsight);
      return;
    }

    setLoading(true);
    setShowInsight(true);
    const data = await generateProductInsight(demo.name, demo.subdomain);
    setInsight(data);
    setLoading(false);
  };

  return (
    <div className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80" />
        <img 
          src={demo.imageUrl} 
          alt={demo.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-200 bg-blue-900/80 backdrop-blur-md rounded-full border border-blue-700/50">
            {demo.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {demo.name}
          </h3>
          <Monitor className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
        </div>
        
        <p className="text-slate-400 text-sm mb-6 flex-grow">
          {demo.description}
        </p>

        {/* AI Insight Section */}
        {showInsight && (
          <div className="mb-6 p-4 bg-slate-900/80 rounded-xl border border-indigo-500/30 animate-fadeIn">
            <div className="flex items-center gap-2 mb-3 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              AI Product Analysis
            </div>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-300 italic">"{insight?.summary}"</p>
                <ul className="space-y-1">
                  {insight?.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-slate-700/50">
          <button 
            onClick={handleGenerateInsight}
            className={`text-sm font-medium flex items-center gap-2 transition-colors ${showInsight ? 'text-indigo-400' : 'text-slate-500 hover:text-indigo-400'}`}
          >
            <Sparkles className="w-4 h-4" />
            {showInsight ? 'Hide Insights' : 'AI Insights'}
          </button>

          <a 
            href={demo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all hover:pr-5 group/btn"
          >
            Launch
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};