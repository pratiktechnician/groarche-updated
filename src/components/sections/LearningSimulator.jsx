import React, { useState } from 'react';
import { Network, Sparkles, ShieldCheck, Users, Zap, CheckCircle2, RefreshCw } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function LearningSimulator({ onOpenLeadGen }) {
  const [selectedCapabilities, setSelectedCapabilities] = useState(['leadership', 'communication']);
  const [activeHoverNode, setActiveHoverNode] = useState(null);

  const capabilities = GROARCHE_DATA.humanSimulatorCapabilities;

  const toggleCapability = (id) => {
    if (selectedCapabilities.includes(id)) {
      if (selectedCapabilities.length > 1) {
        setSelectedCapabilities(selectedCapabilities.filter(c => c !== id));
      }
    } else {
      setSelectedCapabilities([...selectedCapabilities, id]);
    }
  };

  // Calculate simulated team multiplier score (0-100%)
  const teamSynergyScore = Math.min(100, Math.round((selectedCapabilities.length / capabilities.length) * 100));

  return (
    <section id="simulator" className="py-24 relative bg-slate-950/90 border-t border-slate-900 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            Interactive Capability Network
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The <span className="text-gradient">GroArche Learning</span> Experience
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Simulate how enhancing individual human capabilities creates exponential synergy across your entire organizational network.
          </p>
        </div>

        {/* Simulator Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Node Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
                  Select Capabilities to Upgrade
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedCapabilities.length} / {capabilities.length} Active
                </span>
              </div>

              <div className="space-y-2">
                {capabilities.map((cap) => {
                  const isSelected = selectedCapabilities.includes(cap.id);

                  return (
                    <button
                      key={cap.id}
                      onClick={() => toggleCapability(cap.id)}
                      onMouseEnter={() => setActiveHoverNode(cap)}
                      onMouseLeave={() => setActiveHoverNode(null)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full transition-all ${
                          isSelected ? 'bg-emerald-400 shadow-lg shadow-emerald-400/80 animate-pulse' : 'bg-slate-700'
                        }`} />
                        <span className="text-xs sm:text-sm font-semibold">{cap.label}</span>
                      </div>

                      <CheckCircle2 className={`w-4 h-4 transition-opacity ${
                        isSelected ? 'text-emerald-400 opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Reset selection */}
              <button
                onClick={() => setSelectedCapabilities(capabilities.map(c => c.id))}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Activate All Capabilities
              </button>
            </div>
          </div>

          {/* Right Column: Visual Network Display & Synergy Meter */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
              
              {/* Top Synergy Meter */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Simulated Team Synergy Score
                  </h4>
                  <p className="text-xs text-slate-400">Higher capabilities unlock exponential organizational performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-gradient">{teamSynergyScore}%</span>
                </div>
              </div>

              {/* Network Graph Simulation Visual */}
              <div className="my-8 relative h-64 flex items-center justify-center">
                
                {/* Central Synergy Orb */}
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-2xl shadow-emerald-500/50 transition-transform duration-500"
                  style={{ transform: `scale(${1 + teamSynergyScore * 0.003})` }}
                >
                  <Users className="w-10 h-10 text-slate-950" />
                </div>

                {/* Satellite Capability Nodes */}
                {capabilities.map((cap, i) => {
                  const angle = (i / capabilities.length) * Math.PI * 2;
                  const dist = 110;
                  const x = Math.cos(angle) * dist;
                  const y = Math.sin(angle) * dist;
                  const isActive = selectedCapabilities.includes(cap.id);

                  return (
                    <React.Fragment key={cap.id}>
                      {/* Connection Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke={isActive ? '#10b981' : '#334155'}
                          strokeWidth={isActive ? '2' : '1'}
                          strokeDasharray={isActive ? 'none' : '4'}
                          className="transition-all duration-500"
                        />
                      </svg>

                      {/* Node Bubble */}
                      <div
                        onMouseEnter={() => setActiveHoverNode(cap)}
                        onMouseLeave={() => setActiveHoverNode(null)}
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 scale-110'
                            : 'bg-slate-900 text-slate-500 border border-slate-800'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - 20px)`,
                          top: `calc(50% + ${y}px - 20px)`
                        }}
                      >
                        {i + 1}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Node Detail Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 min-h-[70px] flex items-center justify-between">
                <div>
                  <h5 className="text-xs uppercase font-bold text-emerald-400">
                    {activeHoverNode ? activeHoverNode.label : "Hover over any node to inspect details"}
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeHoverNode ? activeHoverNode.desc : "Upgrading individual team members elevates the entire organization's baseline."}
                  </p>
                </div>

                <button
                  onClick={onOpenLeadGen}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ml-4"
                >
                  <span>Build Your Team</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
