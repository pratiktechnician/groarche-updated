import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Quote, Sparkles, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

export default function TestimonialsSection({ onOpenLeadGen }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const testimonials = GROARCHE_DATA.testimonials;

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stories of Change</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Trusted by <span className="text-gradient-gold glow-text-gold">Leaders & Teams</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real experiences structured around Challenge → Facilitation Experience → Behavioral Shift.
          </p>
        </div>

        {/* Featured Testimonial 3D Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel-3d rounded-3xl p-8 sm:p-12 border border-amber-500/50 shadow-2xl relative space-y-8 card-3d-tilt glow-gold-3d">
            
            <Quote className="w-12 h-12 text-amber-500/20 absolute top-8 left-8 pointer-events-none" />

            {/* Stars */}
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            {/* Main Quote */}
            <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic relative z-10">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Challenge -> Experience -> Change Structure Breakdown */}
            {currentTestimonial.structure && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-[#060911] border border-slate-800 space-y-1 glass-panel-3d">
                  <div className="text-[10px] uppercase font-bold text-red-400">01. The Challenge</div>
                  <div className="text-xs text-slate-300">{currentTestimonial.structure.challenge}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#060911] border border-slate-800 space-y-1 glass-panel-3d">
                  <div className="text-[10px] uppercase font-bold text-amber-400">02. Facilitation Experience</div>
                  <div className="text-xs text-slate-300">{currentTestimonial.structure.experience}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#060911] border border-amber-500/40 space-y-1 glass-panel-3d glow-gold-3d">
                  <div className="text-[10px] uppercase font-bold text-yellow-400">03. Behavioral Change</div>
                  <div className="text-xs text-white font-medium">{currentTestimonial.structure.change}</div>
                </div>
              </div>
            )}

            {/* Author Meta & Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white">{currentTestimonial.author}</h4>
                <p className="text-xs text-amber-400 font-semibold">{currentTestimonial.role}</p>
                <p className="text-xs text-slate-400">{currentTestimonial.company}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-[#060911] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-[#060911] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenLeadGen}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 inline-flex items-center gap-3 magnetic-3d-btn"
          >
            <span>Begin Your Team's Growth Story</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
}
