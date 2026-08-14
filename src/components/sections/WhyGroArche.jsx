import React, { useState } from 'react';
import { UserCheck, Building2, Clock, CheckCircle2, Sparkles, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function WhyGroArche({ onOpenLeadGen }) {
  const [activeTab, setActiveTab] = useState('metrics');

  const metricIcons = {
    UserCheck: UserCheck,
    Building2: Building2,
    Clock: Clock
  };

  return (
    <section id="why-us" className="py-24 relative bg-slate-950">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Why Choose GroArche
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learning That Creates <span className="text-gradient">Meaningful Change</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Organizations don't transform when people learn something new — they transform when people consistently do something differently.
          </p>
        </div>

        {/* Verified Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {GROARCHE_DATA.impactMetrics.map((item) => {
            const IconComp = metricIcons[item.icon] || UserCheck;

            return (
              <div
                key={item.label}
                className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center justify-between group"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <IconComp className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans text-gradient">
                    {item.metric}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {item.label}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facili-Training Philosophy Comparison Matrix */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              The GroArche Difference
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              GroArche Facili-Training vs. Traditional Training
            </h3>
            <p className="text-slate-300 text-sm">
              Moving from passive lecture slides to active, experiential behavioral transformation.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 w-1/3">Learning Dimension</th>
                  <th className="py-4 px-4 w-1/3 text-slate-400 bg-slate-900/40 rounded-tl-xl">Traditional Training</th>
                  <th className="py-4 px-4 w-1/3 text-emerald-400 bg-emerald-500/10 rounded-tr-xl">GroArche Facili-Training</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {GROARCHE_DATA.philosophyComparison.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-4 text-slate-400 bg-slate-900/20">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-500/70 flex-shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-emerald-300 font-medium bg-emerald-500/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{row.groarche}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Philosophy Quote Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
              <blockquote className="text-sm italic text-slate-300 leading-relaxed">
                "{GROARCHE_DATA.philosophyComparison.quote}"
              </blockquote>
            </div>

            <button
              onClick={onOpenLeadGen}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Schedule Workshop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
