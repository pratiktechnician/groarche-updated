import React from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { UserCheck, Award, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function FounderSection() {
  const { name, title, credentials, bioStory, transitionVisual, quote } = GROARCHE_DATA.founder;

  const timelineMilestones = [
    {
      phase: "01. Corporate Foundation",
      title: "16+ Years Corporate Leadership",
      desc: "Led complex technical teams, managed global stakeholders, and built cross-functional operational excellence across Wipro & Deloitte."
    },
    {
      phase: "02. The Critical Insight",
      title: "Hard Skills vs Human Effectiveness",
      desc: "Observed that while technical capability opens doors, human behavioral execution, communication, and emotional intelligence dictate long-term success."
    },
    {
      phase: "03. Purpose & Accreditation",
      title: "Certified Facili-Trainer & DTM",
      desc: "Earned CFTP (Certified Facili-Trainer Professional), DTM (Distinguished Toastmaster), and Executive Mentor credentials to master experiential facilitation."
    },
    {
      phase: "04. GroArche Consultancy",
      title: "Realizing Potential → Performance",
      desc: "Founded GroArche Learning Solutions, impacting 4,000+ lives, delivering 140+ workshops, and partnering with 16+ organizations & 6 academic institutions."
    }
  ];

  return (
    <section id="founder" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>The Story Behind GroArche</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Meet the <span className="text-gradient-gold glow-text-gold">Founder</span>
          </h2>
          <p className="text-base text-slate-300">
            Certified Facili-Trainer (CFTP) | Distinguished Toastmaster (DTM) | Executive Mentor
          </p>
        </div>

        {/* Founder Bio Card & Interactive 3D Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Authentic Portrait Card with 3D Parallax & Gold Ambient Glow */}
          <div className="lg:col-span-5">
            <div className="glass-panel-3d rounded-3xl p-4 border border-amber-500/40 shadow-2xl relative group card-3d-tilt glow-gold-3d">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                <img
                  src="https://groarche.pro/wp-content/uploads/2026/07/MG_8158-1-edited-scaled.jpg"
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-2xl font-extrabold text-white">{name}</div>
                  <div className="text-xs font-bold text-amber-400">{title}</div>
                  <div className="text-[11px] text-slate-300 font-medium">{credentials}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & 3D Interactive Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {bioStory.map((para, i) => (
                <p key={i} className="text-base leading-relaxed">{para}</p>
              ))}
            </div>

            {/* 3D Timeline Steps */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>3D Founder Journey Timeline</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timelineMilestones.map((m, idx) => (
                  <div
                    key={m.phase}
                    className="glass-panel-3d p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-2"
                  >
                    <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">{m.phase}</div>
                    <div className="text-sm font-bold text-white">{m.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Quote Callout */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-2 glass-panel-3d">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Founder Philosophy</div>
              <blockquote className="text-sm sm:text-base font-semibold text-white italic leading-relaxed">
                "{quote}"
              </blockquote>
              <div className="text-xs font-bold text-slate-300 text-right">— {name}</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
