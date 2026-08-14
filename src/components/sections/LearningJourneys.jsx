import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { MapPin, ArrowRight, Sparkles, Box } from 'lucide-react';

export default function LearningJourneys({ onOpenLeadGen }) {
  const journeys = GROARCHE_DATA.learningJourneys;
  const [selectedJourneyId, setSelectedJourneyId] = useState(journeys[0].id);

  const selectedJourney = journeys.find(j => j.id === selectedJourneyId) || journeys[0];

  return (
    <section id="learning-journeys" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>3D Services Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Services & Learning <span className="text-gradient-gold glow-text-gold">Constellation</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Organized into five core performance domains with connected workplace outcomes.
          </p>
        </div>

        {/* 3D SPATIAL SERVICE CONSTELLATION NODES */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {journeys.map((j) => {
            const isActive = j.id === selectedJourneyId;
            return (
              <button
                key={j.id}
                onClick={() => setSelectedJourneyId(j.id)}
                className={`glass-panel-3d p-5 rounded-2xl text-left transition-all duration-500 border relative ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/20 text-white shadow-2xl shadow-amber-500/30 scale-105 translate-z-10 font-bold glow-gold-3d'
                    : 'border-slate-800 bg-[#060911] text-slate-400 hover:text-white hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{j.number}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
                </div>
                <div className="text-sm font-bold text-white">{j.title}</div>
                <div className="text-[10px] text-amber-400/80 mt-1 font-semibold">
                  {j.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Journey Detailed Blueprint with 3D Depth Glass Panel */}
        <div className="glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/50 shadow-2xl space-y-8 card-3d-tilt glow-gold-3d">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Box className="w-3.5 h-3.5" />
                <span>3D Spatial Service Node {selectedJourney.number}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedJourney.title}
              </h3>
              <p className="text-sm text-amber-400/90 font-medium">
                {selectedJourney.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedJourney.modules.map(mod => (
                <span key={mod} className="px-3 py-1 rounded-full bg-[#060911] text-xs font-semibold text-slate-300 border border-slate-800">
                  {mod}
                </span>
              ))}
            </div>
          </div>

          {/* Challenge -> Intervention -> Application -> Intended Outcome Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-[#060911] p-6 rounded-2xl border border-slate-800 space-y-2 glass-panel-3d">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider">01. The Challenge</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedJourney.challenge}</p>
            </div>

            <div className="bg-[#060911] p-6 rounded-2xl border border-slate-800 space-y-2 glass-panel-3d">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">02. The Intervention</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedJourney.intervention}</p>
            </div>

            <div className="bg-[#060911] p-6 rounded-2xl border border-slate-800 space-y-2 glass-panel-3d">
              <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider">03. Workplace Application</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedJourney.application}</p>
            </div>

            <div className="bg-[#060911] p-6 rounded-2xl border border-amber-500/40 space-y-2 glass-panel-3d glow-gold-3d">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                04. Intended Outcome
              </div>
              <p className="text-sm text-white font-medium leading-relaxed">{selectedJourney.intendedOutcome}</p>
            </div>

          </div>

          {/* CTA Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Customized for Engineering Colleges, Corporate Enterprises & Professional Leaders.
            </div>
            <button
              onClick={onOpenLeadGen}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:scale-105 transition-transform magnetic-3d-btn"
            >
              <span>Explore {selectedJourney.title} Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
