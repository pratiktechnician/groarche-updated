import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Layers, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export default function GroArcheWay() {
  const components = GROARCHE_DATA.groarcheWay;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % components.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + components.length) % components.length);
  };

  return (
    <section id="groarche-way" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Methodology — 3D Depth Deck</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            The <span className="text-gradient-gold glow-text-gold">GroArche Way</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Our facilitation-first methodology moves away from passive lectures into active, high-impact experiential learning.
          </p>
        </div>

        {/* 3D CARD STACK (DEPTH DECK) */}
        <div className="relative max-w-4xl mx-auto min-h-[380px] flex items-center justify-center card-stack-container py-6">
          {components.map((comp, idx) => {
            // Calculate relative offset from active card
            const offset = (idx - activeCardIndex + components.length) % components.length;
            
            // Assign Z-depth, scale, and opacity based on position in stack
            let zIndex = 10 - offset;
            let transformClass = '';

            if (offset === 0) {
              transformClass = 'translate-z-10 scale-100 opacity-100 border-amber-400/80 shadow-2xl shadow-amber-500/30';
            } else if (offset === 1) {
              transformClass = 'translate-x-6 translate-y-4 -translate-z-10 scale-95 opacity-85 border-amber-500/40';
            } else if (offset === 2) {
              transformClass = 'translate-x-12 translate-y-8 -translate-z-20 scale-90 opacity-70 border-slate-800';
            } else {
              transformClass = 'translate-x-16 translate-y-12 -translate-z-30 scale-85 opacity-40 border-slate-800';
            }

            return (
              <div
                key={comp.id}
                onClick={() => setActiveCardIndex(idx)}
                style={{ zIndex }}
                className={`absolute inset-0 glass-panel-3d rounded-3xl p-8 border flex flex-col justify-between cursor-pointer transition-all duration-500 card-stack-item ${transformClass}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center border border-amber-500/30">
                      0{comp.id}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">DEPTH CARD {comp.id} / 06</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {comp.name}
                  </h3>

                  <p className="text-base text-slate-300 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Facilitation Component</span>
                  </div>
                  <span>Click to Bring Forward →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={prevCard}
            className="p-3 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-all"
            aria-label="Previous 3D Card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {components.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCardIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeCardIndex ? 'bg-amber-400 scale-125' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-all"
            aria-label="Next 3D Card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
