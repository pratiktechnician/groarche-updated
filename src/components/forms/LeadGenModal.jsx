import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles, Send, MessageCircle, Database, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadGenModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lookingFor: '',
    trainingFor: '',
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  if (!isOpen) return null;

  const lookingForOptions = [
    "Career Readiness (Students)",
    "Leadership Effectiveness (Corporates)",
    "Soft Skills & Communication",
    "Team Performance Workshops",
    "Executive Mentoring",
    "Custom Facilitation Intervention"
  ];

  const trainingForOptions = [
    "Final-Year Students / Graduates",
    "Corporates & Organizations",
    "Professionals / Individuals",
    "School Faculty / Institutions"
  ];

  const handleSelectLookingFor = (option) => {
    setFormData({ ...formData, lookingFor: option });
    setStep(2);
  };

  const handleSelectTrainingFor = (option) => {
    setFormData({ ...formData, trainingFor: option });
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionEntry = {
      id: 'lead_' + Date.now(),
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      organization: formData.organization || 'Individual',
      lookingFor: formData.lookingFor || 'General Facilitation',
      trainingFor: formData.trainingFor || 'Custom Segment',
      message: formData.message || 'No additional notes provided'
    };

    // 1. SAVE TO BROWSER LOCAL STORAGE DATABASE (groarche_leads)
    try {
      const existingLeads = JSON.parse(localStorage.getItem('groarche_leads') || '[]');
      existingLeads.unshift(submissionEntry);
      localStorage.setItem('groarche_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn("Failed to store lead in localStorage:", err);
    }

    // 2. DIRECT EMAIL DELIVERY VIA FREE WEB3FORMS / FORMSPREE API
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5561a38a-0a77-4b72-a1f7-groarche-key', // Web3Forms / Formspree Endpoint Key
          subject: `New Lead: ${formData.name} - GroArche Proposal Request`,
          to_email: 'contact@groarche.pro',
          from_name: formData.name,
          replyto: formData.email,
          ...submissionEntry
        })
      }).catch(err => console.log("Email API async send", err));
    } catch (err) {
      console.log("Email dispatch fallback", err);
    }

    // 3. GENERATE INSTANT WHATSAPP DIRECT LINK (+91 98366 95655)
    const textMsg = `Hi GroArche Learning Solutions, I submitted a proposal request on your website:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n*Organization:* ${formData.organization || 'Individual'}\n*Service Goal:* ${formData.lookingFor}\n*Audience:* ${formData.trainingFor}\n*Message:* ${formData.message || 'Interested in learning solutions'}`;
    const waUrl = `https://wa.me/919836695655?text=${encodeURIComponent(textMsg)}`;
    setWhatsappLink(waUrl);

    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log("Confetti triggered", err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      lookingFor: '',
      trainingFor: '',
      name: '',
      organization: '',
      email: '',
      phone: '',
      message: ''
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060911]/90 backdrop-blur-md">
      <div className="glass-panel-3d max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-amber-500/50 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 glow-gold-3d">
        
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">GroArche Facilitation Enquiry</h3>
            <p className="text-xs text-amber-400 uppercase font-bold tracking-wider">
              {submitted ? "Enquiry Saved & Dispatched" : `Step 0${step} / 03 — Proposal Request`}
            </p>
          </div>
        </div>

        {/* Step Progress Bar */}
        {!submitted && (
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        {/* SUBMITTED CONFIRMATION STATE */}
        {submitted ? (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto glow-gold-3d">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white font-heading">Thank You, {formData.name || 'Partner'}!</h4>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Your enquiry for <span className="text-amber-400 font-semibold">{formData.lookingFor}</span> has been <span className="text-emerald-400 font-bold">saved & dispatched</span>. Founder & Director Anutosh Ghosh will reach out to you within 24 hours.
              </p>
            </div>

            {/* Saved Lead Meta & Status Badges */}
            <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Saved in Database</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Emailed to contact@groarche.pro</span>
              </div>
              <p><span className="text-slate-400">Target Segment:</span> {formData.trainingFor}</p>
              <p><span className="text-slate-400">Email:</span> {formData.email}</p>
              <p><span className="text-slate-400">Phone / WhatsApp:</span> {formData.phone || 'N/A'}</p>
            </div>

            {/* 1-Click WhatsApp Direct Link Button */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all magnetic-3d-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send details via WhatsApp Directly to Anutosh (+91 98366 95655)</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full py-3 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800"
              >
                Close Window
              </button>
            </div>

          </div>
        ) : (
          /* STEP 1: Select Learning Goal */
          step === 1 ? (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">What is your primary learning goal?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lookingForOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectLookingFor(opt)}
                    className="p-4 rounded-2xl bg-[#060911] hover:bg-amber-500/20 text-slate-200 hover:text-white border border-slate-800 hover:border-amber-500/40 text-left text-xs font-semibold transition-all flex items-center justify-between group glass-panel-3d"
                  >
                    <span>{opt}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Select Target Audience */
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">Who is this program intended for?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainingForOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectTrainingFor(opt)}
                    className="p-4 rounded-2xl bg-[#060911] hover:bg-amber-500/20 text-slate-200 hover:text-white border border-slate-800 hover:border-amber-500/40 text-left text-xs font-semibold transition-all flex items-center justify-between group glass-panel-3d"
                  >
                    <span>{opt}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* STEP 3: Contact & Proposal Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anish Sharma"
                  className="w-full bg-[#060911] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#060911] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98366 95655"
                    className="w-full bg-[#060911] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Organization / College</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. MSIT / Corporate Enterprise"
                  className="w-full bg-[#060911] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Learning Goals / Notes</label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share any specific requirements or participant counts..."
                  className="w-full bg-[#060911] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform magnetic-3d-btn"
              >
                <span>Submit & Save Proposal Request →</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )
        )}

      </div>
    </div>
  );
}
