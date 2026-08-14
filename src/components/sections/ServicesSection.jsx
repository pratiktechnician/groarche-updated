import React, { useState } from 'react';
import { ShieldCheck, Users, MessageSquareText, Zap, ArrowRight, CheckCircle, Sparkles, ChevronRight } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function ServicesSection({ onOpenLeadGen }) {
  const [activeModalService, setActiveModalService] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Users: Users,
    MessageSquareText: MessageSquareText,
    Zap: Zap
  };

  return (
    <section id="services" className="py-24 relative bg-slate-950">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Programs
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Our Core <span className="text-gradient">Learning Solutions</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Empowering individuals and corporate teams through experiential facili-training that creates lasting workplace transformation.
            </p>
          </div>

          <button
            onClick={onOpenLeadGen}
            className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-white text-sm font-semibold transition-all flex items-center gap-2 hover:bg-slate-800 self-start md:self-auto"
          >
            <span>Request Custom Proposal</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* 3D Tilt Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GROARCHE_DATA.services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Sparkles;
            const isHovered = hoveredCardIndex === idx;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`glass-panel rounded-3xl p-8 border transition-all duration-500 relative group overflow-hidden ${
                  isHovered
                    ? 'border-emerald-500/50 bg-slate-900/90 shadow-2xl shadow-emerald-500/15 -translate-y-2'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
              >
                {/* Background Ambient Glow for active card */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Card Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-110'
                      : 'bg-slate-900 text-emerald-400 border border-slate-800'
                  }`}>
                    <IconComp className="w-7 h-7" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-slate-900/80 text-slate-400 text-[11px] font-medium border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Key Program Highlights */}
                <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-6">
                  {service.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                  >
                    <span>View Curriculum & Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenLeadGen}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-800 hover:border-emerald-500 text-xs font-bold transition-all"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-2xl w-full rounded-3xl p-8 border border-emerald-500/40 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-2xl font-bold text-white">{activeModalService.title}</h3>
                <p className="text-xs text-emerald-400 uppercase font-semibold">GroArche Program Deep Dive</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeModalService.fullDesc}
            </p>

            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3 mb-6">
              <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Target Outcomes & Modules</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalService.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-5 py-2.5 rounded-xl text-slate-300 text-xs font-semibold hover:bg-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => { setActiveModalService(null); onOpenLeadGen(); }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
              >
                Book This Program
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
