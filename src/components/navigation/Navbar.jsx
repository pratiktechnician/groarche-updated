import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function Navbar({ onOpenLeadGen, onOpenWhatsApp, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Challenge", href: "#challenge" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Methodology", href: "#groarche-way" },
    { label: "DNA", href: "#facilitation-dna" },
    { label: "Who We Help", href: "#who-we-help" },
    { label: "Journeys", href: "#learning-journeys" },
    { label: "Impact", href: "#impact" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Recognition", href: "#media-recognition" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#060911]/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#060911] rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm">
                GA
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
                GroArche
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-amber-400/90">
                Learning Solutions
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-[#0b0f19]/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="p-2.5 rounded-full text-slate-300 hover:text-amber-400 bg-[#0b0f19] hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 transition-all duration-300"
              title="Discuss Learning Goals on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenLeadGen}
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs transition-all duration-300 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full group-hover:opacity-100 transition-opacity"></span>
              <span className="relative px-5 py-2.5 rounded-full bg-[#060911] flex items-center gap-2 text-white group-hover:bg-[#060911]/80 transition-colors">
                Explore the GroArche Way
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenLeadGen}
              className="px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40"
            >
              Explore
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0b0f19] border border-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[70px] bg-[#060911]/95 border-b border-slate-800 backdrop-blur-2xl px-6 py-6 transition-all shadow-2xl max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="py-2 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-[#0b0f19] transition-all border border-transparent hover:border-slate-800"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenLeadGen(); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                Explore the GroArche Way
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenWhatsApp(); }}
                className="w-full py-3 rounded-xl bg-[#0b0f19] text-amber-400 border border-amber-500/30 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Discuss Learning Goals (+91 98366 95655)
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
