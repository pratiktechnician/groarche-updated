import React from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { BarChart3, Building2, GraduationCap, Sparkles } from 'lucide-react';

export default function ImpactDashboard() {
  const { headline, metrics, futurePlaceholders } = GROARCHE_DATA.impactDashboard;
  const { industries, partners } = GROARCHE_DATA;

  return (
    <section id="impact" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Verified Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real evidence of facilitation-driven learning delivered across corporate and academic ecosystems.
          </p>
        </div>

        {/* 6 Verified Counters with 3D Card Depth */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m) => (
            <div
              key={m.key}
              className="glass-panel-3d p-6 rounded-2xl border border-amber-500/30 text-center space-y-2 card-3d-tilt glow-gold-3d hover:border-amber-400/80 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-gold glow-text-gold font-sans">{m.count}</div>
              <div className="text-xs font-extrabold text-white">{m.label}</div>
              <div className="text-[11px] text-slate-300 leading-tight">{m.detail}</div>
            </div>
          ))}
        </div>

        {/* 2 Future Metrics Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {futurePlaceholders.map((fp) => (
            <div key={fp.label} className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center justify-between glass-panel-3d">
              <span className="text-xs font-medium text-slate-300">{fp.label}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {fp.status}
              </span>
            </div>
          ))}
        </div>

        {/* Industry Experience & Clean Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-900 pt-12">
          
          {/* Industry Experience */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Industry Experience
            </h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <span key={ind} className="px-4 py-2 rounded-xl bg-[#0b0f19] text-xs font-bold text-slate-200 border border-slate-800 glass-panel-3d">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Academic & Corporate Clients */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Academic Institutions & Enterprise Clients
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Academic Institutions:</div>
              <div className="flex flex-wrap gap-2">
                {partners.academic.map((p) => (
                  <span key={p} className="px-3.5 py-1.5 rounded-lg bg-[#0b0f19] text-xs font-bold text-amber-400 border border-amber-500/30 glass-panel-3d">
                    {p}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400 pt-2">Corporate Partners:</div>
              <div className="flex flex-wrap gap-2">
                {partners.corporate.map((p) => (
                  <span key={p} className="px-3.5 py-1.5 rounded-lg bg-[#0b0f19] text-xs font-bold text-white border border-slate-800 glass-panel-3d">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
