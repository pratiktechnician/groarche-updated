import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneRaw = GROARCHE_DATA.company.contact.phoneRaw;
  const message = encodeURIComponent("Hi GroArche Learning Solutions, I would like to discuss our learning goals.");
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      
      {/* Tasteful Tooltip Prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0b0f19]/95 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl border border-amber-500/30 shadow-2xl backdrop-blur-xl animate-fade-in">
          <span>Let's discuss your learning goals.</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tasteful Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border border-amber-500/40 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        title="WhatsApp GroArche (+91 98366 95655)"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-1.5"></span>
      </a>

    </div>
  );
}
