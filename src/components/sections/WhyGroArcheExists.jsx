import React from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { KeyRound, CheckCircle2, Sparkles } from 'lucide-react';

export default function WhyGroArcheExists() {
  const { doorOpener, successFactor, coreLevers, purposeStatement } = GROARCHE_DATA.whyGroArcheExists;

  return (
    <section id="why-groarche" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000 overflow-hidden">
      
      {/* Background 3D Ambient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none floating-3d-orb" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/50 text-center space-y-8 shadow-2xl card-3d-tilt glow-gold-3d">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Founding Purpose — Why GroArche Exists</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
              "{doorOpener} <span className="text-gradient-gold glow-text-gold">{successFactor}</span>"
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {purposeStatement}
            </p>
          </div>

          {/* 5 Human Levers */}
          <div className="pt-6 border-t border-slate-800">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>The Five Levers of Human Effectiveness</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {coreLevers.map((lever) => (
                <div key={lever} className="px-4 py-2.5 rounded-xl bg-[#0b0f19] text-xs font-bold text-white border border-amber-500/40 flex items-center gap-2 shadow-lg glass-panel-3d">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{lever}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
