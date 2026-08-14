import React, { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import GrowthHero3D from './components/hero/GrowthHero3D';
import TheChallenge from './components/sections/TheChallenge';
import PhilosophySection from './components/sections/PhilosophySection';
import GroArcheWay from './components/sections/GroArcheWay';
import FacilitationDNA from './components/sections/FacilitationDNA';
import WhoWeHelp from './components/sections/WhoWeHelp';
import LearningJourneys from './components/sections/LearningJourneys';
import ImpactDashboard from './components/sections/ImpactDashboard';
import TestimonialsSection from './components/sections/TestimonialsSection';
import GallerySection from './components/sections/GallerySection';
import MediaRecognitionSection from './components/sections/MediaRecognitionSection';
import FounderSection from './components/sections/FounderSection';
import WhyGroArcheExists from './components/sections/WhyGroArcheExists';
import ContactSection from './components/sections/ContactSection';
import GlobalFloatingAssistants from './components/floating/GlobalFloatingAssistants';
import LeadGenModal from './components/forms/LeadGenModal';
import AdminLeadViewerModal from './components/forms/AdminLeadViewerModal';
import SEOAndAnalytics, { trackAnalyticsEvent } from './components/ui/SEOAndAnalytics';
import { GROARCHE_DATA } from './data/groarcheData';

export default function App() {
  const [leadGenOpen, setLeadGenOpen] = useState(false);
  const [adminViewerOpen, setAdminViewerOpen] = useState(false);
  const [storyStage, setStoryStage] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOpenWhatsApp = () => {
    trackAnalyticsEvent('whatsapp_clicked');
    const phoneRaw = GROARCHE_DATA.company.contact.phoneRaw;
    const msg = encodeURIComponent("Hi GroArche Learning Solutions, I would like to discuss our learning goals.");
    window.open(`https://wa.me/${phoneRaw}?text=${msg}`, '_blank');
  };

  const handleOpenLeadGen = () => {
    trackAnalyticsEvent('lead_gen_opened');
    setLeadGenOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active Section Highlight
      const sections = [
        'hero', 'philosophy', 'challenge', 'learning-journeys', 'why-groarche',
        'groarche-way', 'facilitation-dna', 'who-we-help', 'founder', 'impact',
        'testimonials', 'gallery', 'media-recognition', 'contact'
      ];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        setAdminViewerOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#060911] text-slate-100 font-sans min-h-screen selection:bg-amber-400 selection:text-slate-950 relative">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-amber-500/20 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Technical SEO & Schema Markup */}
      <SEOAndAnalytics />

      {/* Navigation Header */}
      <Navbar
        onOpenLeadGen={handleOpenLeadGen}
        onOpenWhatsApp={handleOpenWhatsApp}
        activeSection={activeSection}
      />

      {/* Main Flow */}
      <main id="main-content">
        <GrowthHero3D onOpenLeadGen={handleOpenLeadGen} currentStageIndex={storyStage} />
        <PhilosophySection onOpenLeadGen={handleOpenLeadGen} />
        <TheChallenge onOpenLeadGen={handleOpenLeadGen} />
        <LearningJourneys onOpenLeadGen={handleOpenLeadGen} />
        <WhyGroArcheExists onOpenLeadGen={handleOpenLeadGen} />
        <GroArcheWay onOpenLeadGen={handleOpenLeadGen} />
        <FacilitationDNA onOpenLeadGen={handleOpenLeadGen} />
        <WhoWeHelp onOpenLeadGen={handleOpenLeadGen} />
        <FounderSection onOpenLeadGen={handleOpenLeadGen} />
        <ImpactDashboard />
        <TestimonialsSection onOpenLeadGen={handleOpenLeadGen} />
        <GallerySection />
        <MediaRecognitionSection />
        <ContactSection onOpenLeadGen={handleOpenLeadGen} onOpenWhatsApp={handleOpenWhatsApp} />
      </main>

      {/* GLOBAL VIEWPORT FIXED FLOATING ASSISTANTS STACK */}
      <GlobalFloatingAssistants onOpenLeadGen={handleOpenLeadGen} />

      {/* Conversational Proposal Lead Modal */}
      <LeadGenModal
        isOpen={leadGenOpen}
        onClose={() => setLeadGenOpen(false)}
      />

      {/* Admin Lead Viewer Modal (Press Ctrl + Shift + L) */}
      <AdminLeadViewerModal
        isOpen={adminViewerOpen}
        onClose={() => setAdminViewerOpen(false)}
      />

    </div>
  );
}
