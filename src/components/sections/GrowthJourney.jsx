import React, { useState } from 'react';
import { Compass, BookOpen, Dumbbell, RefreshCw, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function GrowthJourney({ onOpenLeadGen }) {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Compass, BookOpen, Dumbbell, RefreshCw, Trophy];

  return (
    <section id="journey" className="py-24 relative bg-slate-950/90 border-t border-slate-900 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Methodology & Framework
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your <span className="text-gradient">Growth Journey</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A structured 5-stage experiential pathway designed to move individuals and teams from initial awareness to sustained workplace achievement.
          </p>
        </div>

        {/* Interactive Desktop Pathway Timeline */}
        <div className="hidden lg:block relative mb-16">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStep / (GROARCHE_DATA.journeySteps.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {GROARCHE_DATA.journeySteps.map((j, idx) => {
              const IconComp = stepIcons[idx] || Compass;
              const isActive = idx === activeStep;

              return (
                <div
                  key={j.step}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/40 scale-110'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-emerald-500/50 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-7 h-7" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                      Step {j.step}
                    </span>
                    <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {j.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Journey Nodes */}
        <div className="lg:hidden space-y-4 mb-12">
          {GROARCHE_DATA.journeySteps.map((j, idx) => {
            const IconComp = stepIcons[idx] || Compass;
            const isActive = idx === activeStep;

            return (
              <div
                key={j.step}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel rounded-2xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                  isActive ? 'border-emerald-500/60 bg-slate-900' : 'border-slate-800'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Step {j.step}</div>
                  <h3 className="text-base font-bold text-white">{j.title} — <span className="text-slate-400 text-xs font-normal">{j.subtitle}</span></h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{j.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Expanded Card for Active Step (Desktop view) */}
        <div className="hidden lg:block glass-panel rounded-3xl p-8 border border-emerald-500/30 max-w-4xl mx-auto shadow-2xl relative">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Phase {GROARCHE_DATA.journeySteps[activeStep].step}: {GROARCHE_DATA.journeySteps[activeStep].title}
                </span>
                <span className="text-xs text-slate-400 font-mono">5-Stage Experiential Model</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {GROARCHE_DATA.journeySteps[activeStep].subtitle}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                {GROARCHE_DATA.journeySteps[activeStep].desc}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <div className="flex gap-2">
                  {GROARCHE_DATA.journeySteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === activeStep ? 'bg-emerald-400 w-8' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={onOpenLeadGen}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <span>Design Your Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
