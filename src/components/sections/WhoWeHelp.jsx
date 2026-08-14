import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function WhoWeHelp({ onOpenLeadGen }) {
  const audienceList = GROARCHE_DATA.whoWeHelp;
  const [activeAudienceId, setActiveAudienceId] = useState(audienceList[0].id);

  const activeAudience = audienceList.find(a => a.id === activeAudienceId) || audienceList[0];

  return (
    <section id="who-we-help" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Target Audience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Who We <span className="text-gradient-gold glow-text-gold">Help</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select your profile to discover customized learning goals and interventions.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {audienceList.map((aud) => {
            const isActive = aud.id === activeAudienceId;
            return (
              <button
                key={aud.id}
                onClick={() => setActiveAudienceId(aud.id)}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/30 scale-105 glow-gold-3d'
                    : 'bg-[#0b0f19] text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/30'
                }`}
              >
                {aud.category}
              </button>
            );
          })}
        </div>

        {/* Selected Audience Display Card with 3D Glass Depth */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/50 space-y-8 shadow-2xl card-3d-tilt glow-gold-3d">
            
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Audience Segment</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeAudience.category}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed italic">
                "{activeAudience.tagline}"
              </p>
            </div>

            {/* Needs List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Key Learning & Performance Objectives
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeAudience.needs.map((need) => (
                  <div key={need} className="flex items-center gap-3 bg-[#060911] p-3.5 rounded-xl border border-slate-800 glass-panel-3d">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{need}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Magnetic CTA Button */}
            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={onOpenLeadGen}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 flex items-center gap-3 magnetic-3d-btn"
              >
                <span>{activeAudience.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
