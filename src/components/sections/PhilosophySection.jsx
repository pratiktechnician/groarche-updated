import React, { useState, useEffect } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function PhilosophySection() {
  const { tagline, belief, flowSteps, definingQuote } = GROARCHE_DATA.philosophy;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('philosophy');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute Z-space scale and opacity for the word "POTENTIAL"
  const wordScale = 1 + scrollProgress * 4;
  const wordZPos = (scrollProgress - 0.5) * 400;
  const wordOpacity = Math.max(1 - Math.abs(scrollProgress - 0.4) * 2.5, 0.15);

  return (
    <section id="philosophy" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000 overflow-hidden">
      
      {/* WOW MOMENT 2 — SCROLL THROUGH WORDS ("POTENTIAL") */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="text-[12vw] sm:text-[14vw] font-black tracking-tighter uppercase text-amber-500/10 font-heading select-none transition-transform duration-200 ease-out glow-text-gold"
          style={{
            transform: `scale(${wordScale}) translateZ(${wordZPos}px)`,
            opacity: wordOpacity,
          }}
        >
          POTENTIAL
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Philosophy & Learning Loop</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            {tagline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {belief}
          </p>
        </div>

        {/* 5-Step Experiential Learning Loop */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-widest text-amber-400 text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>How Learning Actually Happens at GroArche</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {flowSteps.map((s, idx) => (
              <div
                key={s.step}
                className="glass-panel-3d rounded-2xl p-6 border border-slate-800 text-center flex flex-col justify-between hover:border-amber-500/60 transition-all duration-300 card-3d-tilt"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 mx-auto rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30 shadow-md">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white">{s.step}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Defining Philosophy Quote Moment of Reflection */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/40 text-center relative shadow-2xl glow-gold-3d">
            <div className="text-amber-400 text-4xl mb-4">“</div>
            <blockquote className="text-xl sm:text-2xl font-bold text-white italic leading-relaxed">
              "{definingQuote}"
            </blockquote>
            <div className="mt-6 text-xs uppercase font-bold tracking-widest text-amber-400">
              The GroArche Measurement Principle
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
