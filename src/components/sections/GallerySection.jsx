import React, { useState } from 'react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { Camera, Sparkles, X, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const galleryItems = GROARCHE_DATA.gallery;
  const categories = ["All", "Workshops", "Campus Programs", "Corporate Interventions", "Leadership Programs", "Speaking Engagements", "Facilitation Moments"];
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 relative z-10 border-t border-slate-900/60 bg-transparent perspective-2000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>3D Floating Gallery Wall</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Facilitation <span className="text-gradient-gold glow-text-gold">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real evidence of experiential learning, group wisdom harvesting, and corporate interventions in action.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/30 font-bold scale-105 glow-gold-3d'
                  : 'bg-[#0b0f19] text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Floating Photo Gallery Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="glass-panel-3d rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between border border-amber-500/30 card-3d-tilt glow-gold-3d hover:border-amber-400/80 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#060911]/90 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  {item.category}
                </div>
                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-amber-500/20 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060911]/90 backdrop-blur-md">
          <div className="glass-panel-3d max-w-3xl w-full rounded-3xl p-6 border border-amber-500/50 relative shadow-2xl space-y-4 glow-gold-3d">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#0b0f19] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-800">
              <img
                src={activeLightboxItem.img}
                alt={activeLightboxItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase">{activeLightboxItem.category}</span>
              <h3 className="text-xl font-bold text-white">{activeLightboxItem.title}</h3>
              <p className="text-xs text-slate-300">{activeLightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
