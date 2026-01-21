import React from 'react';
import { Layers, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-slate-900 border-b border-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10 text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-blue-600/20 p-3 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
            <Layers className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Aimaxl
          </span>{' '}
          Unified Demo Portal
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-8">
          Explore our suite of specialized enterprise solutions. From intelligent Point of Sale systems to comprehensive Financial Management tools.
        </p>

        <div className="flex justify-center gap-4">
          <a href="#demos" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
            View All Demos
          </a>
          <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full font-semibold transition-all border border-slate-700 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            New Features
          </button>
        </div>
      </div>
    </header>
  );
};