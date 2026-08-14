import React from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function TheChallenge() {
  const { headline, subheadline, gapPoints } = GROARCHE_DATA.theChallenge;

  return (
    <section id="challenge" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>The Performance Gap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
            {headline}
          </h2>
          <p className="text-base sm:text-xl text-amber-400 font-bold glow-text-gold">
            "{subheadline}"
          </p>
        </div>

        {/* 3 Core Gap Cards with 3D Depth Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gapPoints.map((point, idx) => (
            <div
              key={point.title}
              className="glass-panel-3d rounded-3xl p-8 border border-amber-500/30 flex flex-col justify-between card-3d-tilt glow-gold-3d hover:border-amber-400/80 transition-all duration-500"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest">
                    GAP 0{idx + 1} / PERFORMANCE
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {point.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>Closing the Performance Gap</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
