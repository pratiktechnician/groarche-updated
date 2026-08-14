import React from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Award, GraduationCap, Building2, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function MediaRecognitionSection() {
  const { credentials, institutionalEngagements, enterprisePartners } = GROARCHE_DATA.mediaRecognition;

  return (
    <section id="media-recognition" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Institutional Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Media & <span className="text-gradient-gold glow-text-gold">Recognition</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Professional certifications, institutional partnerships, and verified corporate engagements.
          </p>
        </div>

        {/* 3 Main Grid Blocks with 3D Card Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Block 1: Professional Certifications */}
          <div className="glass-panel-3d rounded-3xl p-8 border border-amber-500/40 space-y-6 flex flex-col justify-between card-3d-tilt glow-gold-3d">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Certifications & Credentials</h3>
              </div>
              <div className="space-y-3 pt-2">
                {credentials.map((cred) => (
                  <div key={cred.title} className="p-3.5 rounded-2xl bg-[#060911] border border-slate-800 space-y-1 glass-panel-3d">
                    <div className="text-xs font-bold text-amber-400">{cred.title}</div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">{cred.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-amber-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>100% Verified Credentials</span>
            </div>
          </div>

          {/* Block 2: Academic Institutional Partners */}
          <div className="glass-panel-3d rounded-3xl p-8 border border-amber-500/40 space-y-6 flex flex-col justify-between card-3d-tilt glow-gold-3d">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Academic Institutions</h3>
              </div>
              <div className="space-y-3 pt-2">
                {institutionalEngagements.map((inst) => (
                  <div key={inst.name} className="p-3.5 rounded-2xl bg-[#060911] border border-slate-800 space-y-1 glass-panel-3d">
                    <div className="text-xs font-bold text-white">{inst.name}</div>
                    <div className="text-[11px] text-amber-400/90 font-medium">{inst.role}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-amber-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Campus-to-Corporate Facilitation</span>
            </div>
          </div>

          {/* Block 3: Corporate Enterprise Partners */}
          <div className="glass-panel-3d rounded-3xl p-8 border border-amber-500/40 space-y-6 flex flex-col justify-between card-3d-tilt glow-gold-3d">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Corporate Enterprise Clients</h3>
              </div>
              <div className="space-y-3 pt-2">
                {enterprisePartners.map((ent) => (
                  <div key={ent.name} className="p-3.5 rounded-2xl bg-[#060911] border border-slate-800 space-y-1 glass-panel-3d">
                    <div className="text-xs font-bold text-white">{ent.name}</div>
                    <div className="text-[11px] text-amber-400/90 font-medium">{ent.role}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-amber-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Leadership & Team Interventions</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
