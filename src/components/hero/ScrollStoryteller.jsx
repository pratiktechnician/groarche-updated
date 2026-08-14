import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Zap, Layers, Network, Trophy } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function ScrollStoryteller({ setStoryStage, currentStageIndex, onOpenLeadGen }) {
  const icons = [Sparkles, Layers, Zap, Network, Trophy];

  return (
    <section id="story" className="py-24 relative overflow-hidden bg-slate-950/90 border-t border-slate-900">
      
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Scroll-Driven Transformation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The 5-Stage <span className="text-gradient">Evolution</span> of Growth
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            How GroArche transforms individual potential into organizational excellence step by step.
          </p>
        </div>

        {/* 5 Stages Horizontal / Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {GROARCHE_DATA.heroStoryStages.map((stage, idx) => {
            const IconComponent = icons[idx] || Sparkles;
            const isSelected = idx === currentStageIndex;

            return (
              <div
                key={stage.stage}
                onClick={() => setStoryStage(idx)}
                className={`glass-panel rounded-2xl p-6 cursor-pointer transition-all duration-300 relative group ${
                  isSelected
                    ? 'border-emerald-500/60 bg-slate-900/90 shadow-xl shadow-emerald-500/15 -translate-y-2'
                    : 'hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                {/* Stage Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{stage.stage}
                  </span>
                  <IconComponent className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>

                <div className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-1">
                  {stage.title}
                </div>
                
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  "{stage.subtitle}"
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {stage.description}
                </p>

                {/* Bottom Active Indicator Line */}
                <div className={`mt-4 h-1 rounded-full transition-all duration-500 ${
                  isSelected ? 'bg-gradient-to-r from-emerald-400 to-teal-400 w-full' : 'bg-slate-800 w-1/3 group-hover:w-1/2'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-16 glass-panel rounded-3xl p-8 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Ready to take your organization to Stage 05?</h3>
            <p className="text-slate-400 text-sm">Experience experiential learning tailored to your specific team challenges.</p>
          </div>
          <button
            onClick={onOpenLeadGen}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Start Transformation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
