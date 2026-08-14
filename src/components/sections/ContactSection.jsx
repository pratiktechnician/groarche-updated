import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Send, Instagram, Linkedin, Box } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function ContactSection({ onOpenLeadGen, onOpenWhatsApp }) {
  const c = GROARCHE_DATA.company;

  return (
    <section id="contact" className="py-24 relative bg-transparent border-t border-slate-900/60 perspective-2000">
      
      {/* Background Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Final Pathway — The Studio Destination</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Potential is where the journey begins. <br />
            <span className="text-gradient-gold glow-text-gold">Performance is what happens next.</span>
          </h2>
        </div>

        {/* SIGNATURE WOW MOMENT: THE GROARCHE TRANSFORMATION CORE */}
        <div className="max-w-4xl mx-auto glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/50 shadow-2xl relative overflow-hidden text-center space-y-6 card-3d-tilt glow-gold-3d">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-2xl shadow-amber-500/40 transform hover:rotate-45 transition-transform duration-700">
            <div className="w-full h-full bg-[#060911] rounded-full flex items-center justify-center text-amber-400 font-extrabold text-lg">
              <Box className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              THE GROARCHE TRANSFORMATION CORE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Realizing Potential → Delivering Performance
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              You have explored GroArche's philosophy, methodology, and verified impact. Discover how we can customize a facilitation-driven program for your team or career.
            </p>
          </div>
        </div>

        {/* 3 Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel-3d rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6 card-3d-tilt">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">For Students</span>
              <h3 className="text-xl font-bold text-white">Campus-to-Corporate Readiness</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build interview confidence, workplace articulation, and professional presence.
              </p>
            </div>
            <button
              onClick={onOpenLeadGen}
              className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 magnetic-3d-btn"
            >
              <span>Start Your Career Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="glass-panel-3d rounded-3xl p-8 border border-amber-500/50 flex flex-col justify-between space-y-6 card-3d-tilt glow-gold-3d">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">For Corporates</span>
              <h3 className="text-xl font-bold text-white">High-Performing Teams</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Develop leadership, communication, EQ, and cross-functional team alignment.
              </p>
            </div>
            <button
              onClick={onOpenLeadGen}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 magnetic-3d-btn"
            >
              <span>Build High-Performing Teams</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="glass-panel-3d rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6 card-3d-tilt">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">For Individuals</span>
              <h3 className="text-xl font-bold text-white">Executive Development</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refine executive presence, strategic articulation, and career effectiveness.
              </p>
            </div>
            <button
              onClick={onOpenLeadGen}
              className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 magnetic-3d-btn"
            >
              <span>Begin Your Growth Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          <div className="lg:col-span-6 space-y-4">
            
            <a
              href={`mailto:${c.contact.email}`}
              className="glass-panel-3d rounded-2xl p-6 border border-slate-800 flex items-center gap-4 group card-3d-tilt"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Direct Email</h4>
                <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{c.contact.email}</p>
              </div>
            </a>

            <a
              href={`tel:${c.contact.phoneRaw}`}
              className="glass-panel-3d rounded-2xl p-6 border border-slate-800 flex items-center gap-4 group card-3d-tilt"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Phone / WhatsApp</h4>
                <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{c.contact.phone}</p>
              </div>
            </a>

            <div className="glass-panel-3d rounded-2xl p-6 border border-slate-800 flex items-start gap-4 card-3d-tilt">
              <div className="w-12 h-12 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Location</h4>
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-xs text-slate-300">{c.address.formatted}</p>
              </div>
            </div>

            {/* Verified Social Channels */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 flex items-center justify-between glass-panel-3d">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Social Channels</span>
              <div className="flex gap-3">
                <a
                  href={c.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={c.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  aria-label="Instagram @anughosh85"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel-3d rounded-3xl p-8 sm:p-10 border border-amber-500/40 shadow-2xl h-full flex flex-col justify-between space-y-6 card-3d-tilt glow-gold-3d">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <Send className="w-3.5 h-3.5" />
                  <span>Start a Conversation</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Discuss Your Organization's Learning Goals</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tell us about your team's objectives. We will partner with you to design a customized facilitation-driven intervention.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onOpenLeadGen}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 magnetic-3d-btn"
                >
                  <span>Request Proposal Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-4 rounded-xl bg-[#0b0f19] text-amber-400 border border-amber-500/30 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 magnetic-3d-btn"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat directly via WhatsApp (+91 98366 95655)</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Strict Privacy: Details are confidential and used solely for consultation.
              </p>

            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GroArche Learning Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Facilitation-driven human performance consultancy</span>
            <span>Kolkata, WB, India</span>
          </div>
        </div>

      </div>
    </section>
  );
}
