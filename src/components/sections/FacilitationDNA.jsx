import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { ShieldAlert, ArrowUpRight, Box, Sparkles } from 'lucide-react';

export default function FacilitationDNA() {
  const principles = GROARCHE_DATA.facilitationDNA;
  const [activeDNA, setActiveDNA] = useState(0);

  return (
    <section id="facilitation-dna" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Operating Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Facilitation <span className="text-gradient-gold glow-text-gold">DNA</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Four fundamental operating principles that guide every learning intervention we design.
          </p>
        </div>

        {/* 3D Interactive Philosophy Installation */}
        <div className="relative max-w-5xl mx-auto py-8">
          
          {/* Glowing Central 3D Studio Core */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-amber-500/20 animate-spin-slow flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-amber-500/40 animate-ping opacity-25"></div>
            </div>
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-600/10 border border-amber-500/50 backdrop-blur-md flex flex-col items-center justify-center text-amber-400 font-black text-xs shadow-2xl shadow-amber-500/30">
              <Sparkles className="w-5 h-5 mb-1 animate-pulse text-amber-400" />
              <span>GROARCHE</span>
              <span className="text-[9px] text-white/80">CORE</span>
            </div>
          </div>

          {/* 4 Orbiting DNA Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {principles.map((p, idx) => {
              const [primary, secondary] = p.title.split(' over ');
              const isActive = activeDNA === idx;

              return (
                <div
                  key={p.title}
                  onMouseEnter={() => setActiveDNA(idx)}
                  className={`glass-panel-3d rounded-3xl p-8 border relative overflow-hidden transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'border-amber-400/80 shadow-2xl shadow-amber-500/30 scale-[1.03] -translate-y-2 z-20'
                      : 'border-amber-500/30 hover:border-amber-500/60 z-10'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span className="text-xs font-mono font-bold text-amber-400">0{idx + 1} / FACILITATION DNA</span>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 transition-transform ${isActive ? 'text-amber-400 translate-x-1 -translate-y-1' : 'text-slate-500'}`} />
                  </div>

                  <div className="py-6 space-y-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 flex-wrap">
                      <span className="text-amber-400 glow-text-gold">{primary}</span>
                      <span className="text-slate-500 text-base font-normal">over</span>
                      <span className="text-slate-400 line-through text-lg">{secondary}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-amber-400">
                    <span>Facilitation DNA Element</span>
                    <span>Hover to Focus →</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
