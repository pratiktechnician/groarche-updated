import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageCircle, X, Send, Sparkles, Mic, Volume2, VolumeX } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';
import { CHATBOT_CONFIG } from '../chatbot/AIAssistant';
import confetti from 'canvas-confetti';

export default function GlobalFloatingAssistants({ onOpenLeadGen }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello hello! ✨ Welcome to GroArche Learning Solutions! I'm your AI Voice & Chat guide. Ask me anything by voice or text about our services, methodology, founder, or location!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTopic, setActiveTopic] = useState('general');

  // VOICE AGENT RAG STATE (Web Speech API Recognition & Text-to-Speech Synthesis)
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [systemVoices, setSystemVoices] = useState([]);
  const recognitionRef = useRef(null);

  // Conversational Lead Collection State Machine (0 = None, 1 = Name, 2 = Email, 3 = Phone)
  const [chatLeadStep, setChatLeadStep] = useState(0);
  const [chatLeadData, setChatLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryTopic: ''
  });

  const chatEndRef = useRef(null);
  const phoneRaw = GROARCHE_DATA.company.contact.phoneRaw;
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${encodeURIComponent("Hi GroArche Learning Solutions, I would like to discuss our learning goals.")}`;

  const quickPills = [
    "About GroArche",
    "Our Services",
    "Leadership Programs",
    "Campus to Corporate",
    "Founder Anutosh",
    "Location & Contact",
    "Clients & Partners",
    "Pricing & Quotes"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        setSystemVoices(window.speechSynthesis.getVoices() || []);
      }
    };
    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    };
  }, []);

  // Helper to select the best natural, human-like female voice available on visitor's device
  const getBestFemaleJollyVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = systemVoices.length > 0 ? systemVoices : (window.speechSynthesis.getVoices() || []);
    if (!voices || voices.length === 0) return null;

    const lowerName = (v) => v.name.toLowerCase();
    const lowerLang = (v) => v.lang.toLowerCase();

    // Priority 1: High quality Google / Microsoft / Apple Female Natural voices
    const topFemaleVoices = voices.filter(v => {
      const name = lowerName(v);
      const lang = lowerLang(v);
      const isEnglish = lang.includes('en');
      return isEnglish && (
        name.includes('google us english') ||
        name.includes('google uk english female') ||
        name.includes('natural') ||
        name.includes('jenny') ||
        name.includes('aria') ||
        name.includes('zira') ||
        name.includes('samantha') ||
        name.includes('victoria') ||
        name.includes('karen') ||
        name.includes('moira') ||
        name.includes('female')
      );
    });

    if (topFemaleVoices.length > 0) {
      // 1a. Google US English (super warm, natural female voice on Chrome)
      const googleFemale = topFemaleVoices.find(v => lowerName(v).includes('google us english') || lowerName(v).includes('google uk english female'));
      if (googleFemale) return googleFemale;

      // 1b. Microsoft Natural / Zira / Aria female on Windows / Edge
      const naturalFemale = topFemaleVoices.find(v => lowerName(v).includes('natural') || lowerName(v).includes('jenny') || lowerName(v).includes('aria') || lowerName(v).includes('zira'));
      if (naturalFemale) return naturalFemale;

      return topFemaleVoices[0];
    }

    // Fallback: any female voice or standard English voice
    const fallbackFemale = voices.find(v => lowerName(v).includes('female') || lowerName(v).includes('zira') || lowerName(v).includes('samantha'));
    if (fallbackFemale) return fallbackFemale;

    const enUsVoice = voices.find(v => lowerLang(v).includes('en-us') || lowerLang(v).includes('en'));
    return enUsVoice || voices[0];
  };

  // Text-To-Speech Synthesis Function with Joyful Natural Female Voice Tuning & Speech Mute Guard
  const speakResponse = (textToSpeak) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      if (recognitionRef.current && isListening) {
        try { recognitionRef.current.stop(); } catch(e){}
        setIsListening(false);
      }

      window.speechSynthesis.cancel();
      const cleanText = textToSpeak.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Select best female voice
      const femaleVoice = getBestFemaleJollyVoice();
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      // Joyful, warm, human-like voice parameters
      utterance.pitch = 1.18; // Warm, friendly, upbeat female pitch
      utterance.rate = 1.03;  // Natural conversational speed

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("SpeechSynthesis error:", err);
    }
  };

  // Push-to-Talk Speech Recognition (Single Turn Mode - Auto Stops When Done)
  const toggleVoiceListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome, Edge, or Android Chrome!");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
      setIsListening(false);
      return;
    }

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputVal(transcript);

        if (event.results[0].isFinal) {
          setIsListening(false);
          handleSend(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn("Speech recognition init error:", err);
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // ================= STEP-BY-STEP CHAT LEAD COLLECTION LOGIC =================
    if (chatLeadStep === 1) {
      const name = query;
      setChatLeadData(prev => ({ ...prev, name }));
      setChatLeadStep(2);

      setTimeout(() => {
        const replyText = `Awesome to meet you, ${name}! ✨ What is your Email address so our team can send over all the details? 📧`;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        speakResponse(replyText);
        setIsTyping(false);
      }, 500);
      return;
    }

    if (chatLeadStep === 2) {
      const email = query;
      setChatLeadData(prev => ({ ...prev, email }));
      setChatLeadStep(3);

      setTimeout(() => {
        const replyText = `Perfect! And lastly, what is your Phone or WhatsApp number so we can stay connected? 📲`;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        speakResponse(replyText);
        setIsTyping(false);
      }, 500);
      return;
    }

    if (chatLeadStep === 3) {
      const phone = query;
      const finalName = chatLeadData.name || 'Partner';
      const finalEmail = chatLeadData.email || 'N/A';
      const finalTopic = chatLeadData.inquiryTopic || 'Chatbot Inquiry';

      const submissionEntry = {
        id: 'chat_lead_' + Date.now(),
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString(),
        name: finalName,
        email: finalEmail,
        phone: phone,
        organization: 'Chatbot Visitor Inquiry',
        lookingFor: finalTopic,
        message: `Captured in chat/voice regarding: ${finalTopic}`
      };

      // 1. Save to Local Storage Database (groarche_leads)
      try {
        const existingLeads = JSON.parse(localStorage.getItem('groarche_leads') || '[]');
        existingLeads.unshift(submissionEntry);
        localStorage.setItem('groarche_leads', JSON.stringify(existingLeads));
      } catch (err) {}

      // 2. Email Notification
      try {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'groarche-chat-key',
            subject: `New Joyful Conversational Lead: ${finalName}`,
            to_email: 'contact@groarche.pro',
            ...submissionEntry
          })
        }).catch(err => console.log("Email dispatch async", err));
      } catch (err) {}

      // 3. Confetti Celebration
      try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } }); } catch(err){}

      setChatLeadStep(0);
      setChatLeadData({ name: '', email: '', phone: '', inquiryTopic: '' });

      setTimeout(() => {
        const replyText = `Woohoo, ${finalName}! 🎉 Your details are saved! The GroArche team will connect with you directly with all the answers! Have an amazing day ahead! ✨`;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        speakResponse(replyText);
        setIsTyping(false);
      }, 500);
      return;
    }

    // ================= GROUNDED RAG KNOWLEDGE BASE & GREETING INTENT ENGINE =================
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = "";

      // 1. GREETINGS & CASUAL HELLO (Saying Hi back!)
      if (
        lower === 'hi' || lower === 'hii' || lower === 'hiii' || lower === 'hello' || lower === 'hey' || lower === 'heyy' || 
        lower.startsWith('hi ') || lower.startsWith('hello ') || lower.startsWith('hey ') || lower.includes('good morning') || 
        lower.includes('good afternoon') || lower.includes('good evening') || lower === 'yo' || lower === 'sup' || lower === 'greetings'
      ) {
        replyText = "Hello hello! 👋 Hi there! Welcome to GroArche Learning Solutions! I'm so happy to chat with you today! ✨ What exciting learning goal can we explore together?";
      } 

      // 2. FAREWELLS & GOODBYES (Saying Bye back!)
      else if (
        lower === 'bye' || lower === 'byee' || lower === 'goodbye' || lower === 'bye bye' || lower === 'cya' || lower === 'see ya' || 
        lower.includes('see you') || lower.includes('have a nice day') || lower.includes('good night') || lower.includes('take care') || 
        lower.includes('ttyl') || lower.includes('bye!')
      ) {
        replyText = "Goodbye! 👋 It was such an absolute pleasure chatting with you! Have a wonderful day ahead, and remember: Realizing Potential. Delivering Performance! ✨ See you soon!";
      }

      // 3. GRATITUDE & THANKS
      else if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate')) {
        replyText = "You're so very welcome! 😊 Always a joy to help! Feel free to ask anything else about GroArche anytime! ✨";
      }

      // 4. SMALL TALK & HOW ARE YOU
      else if (lower.includes('how are you') || lower.includes('who are you') || lower.includes('what can you do')) {
        replyText = "I'm feeling fantastic, thank you for asking! 😄 I'm the GroArche AI Guide. I can answer all your questions about our leadership programs, campus placement readiness, founder background, facilitation methodology, and contact info!";
      }

      // 5. ABOUT GROARCHE & MISSION
      else if (
        lower.includes('what is groarche') || lower.includes('tell me about groarche') || lower.includes('what do you do') || 
        lower.includes('about groarche') || lower.includes('overview') || lower.includes('mission') || lower.includes('tagline') || 
        lower.includes('about us') || lower.includes('purpose')
      ) {
        replyText = "GroArche Learning Solutions is a facilitation-driven human performance consultancy! Our tagline is 'Realizing Potential. Delivering Performance.' We bridge the gap between technical capability and human behavioral execution through experiential learning!";
      }

      // 6. SERVICES & CORE PILLARS OVERVIEW
      else if (lower.includes('services') || lower.includes('programs') || lower.includes('courses') || lower.includes('offerings') || lower.includes('what do you offer') || lower.includes('modules')) {
        replyText = "We offer 4 core learning pillars: 1) Leadership Effectiveness (Executive Presence, EQ, Strategic Vision), 2) Campus-to-Corporate Readiness (Placement Confidence, Mock Interviews), 3) Corporate Team Synergy (Silo Elimination, Collaboration), and 4) 1-on-1 Executive Mentoring!";
      }

      // 7. METHODOLOGY & FACILITATION VS TRAINING
      else if (lower.includes('facilitation') || lower.includes('training') || lower.includes('methodology') || lower.includes('how it works') || lower.includes('difference') || lower.includes('groarche way')) {
        replyText = "Great question! Unlike passive training lectures where people just sit and listen, GroArche uses Experiential Facilitation — active simulations, guided reflection, and group wisdom harvesting so participants translate breakthrough insights into real workplace habits!";
      }

      // 8. FOUNDER ANUTOSH GHOSH & CREDENTIALS
      else if (
        lower.includes('anutosh') || lower.includes('founder') || lower.includes('who is') || lower.includes('director') || 
        lower.includes('experience') || lower.includes('background') || lower.includes('credentials') || lower.includes('dtm') || lower.includes('cftp')
      ) {
        setActiveTopic('founder');
        replyText = "Anutosh Ghosh is the Founder & Director of GroArche! He is a Certified Facili-Trainer (CFTP), Distinguished Toastmaster (DTM), and Executive Mentor with 16+ years leading teams at Wipro & Deloitte. His philosophy: 'Learning is not measured by what is taught, but by what changes.' 💡";
      }

      // 9. LOCATION, ADDRESS & OFFICE
      else if (lower.includes('location') || lower.includes('where are you') || lower.includes('address') || lower.includes('office') || lower.includes('kolkata') || lower.includes('located') || lower.includes('where is')) {
        replyText = "GroArche Learning Solutions is based in Kolkata, West Bengal, India! Address: R/AA-28, Purbapally, Raghunathpur, Kolkata 700059. We deliver physical in-person workshops across India as well as global virtual interventions! 📍";
      }

      // 10. CONTACT & PHONE / WHATSAPP / EMAIL
      else if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('reach') || lower.includes('call') || lower.includes('talk') || lower.includes('number')) {
        replyText = "You can connect directly with GroArche Learning Solutions via WhatsApp or Call at +91 98366 95655 or email contact@groarche.pro! You can also check out Founder Anutosh on Instagram @anughosh85! 📲";
      }

      // 11. CLIENTS, PARTNERS, TRACK RECORD & TESTIMONIALS
      else if (lower.includes('client') || lower.includes('partner') || lower.includes('companies') || lower.includes('organizations') || lower.includes('colleges') || lower.includes('institutions') || lower.includes('track record') || lower.includes('testimonials')) {
        replyText = "GroArche has impacted 4,000+ lives across 16+ organizations and 6 academic institutions! Corporate partners include ACH & Associates and Bhuwania & Associates. Academic partners include MSIT (Meghnad Saha Inst. of Tech), Loreto Convent Entally, and Loreto House! 🌟";
      }

      // 12. LEADERSHIP & EXECUTIVE PRESENCE
      else if (lower.includes('leadership') || lower.includes('executive') || lower.includes('presence') || lower.includes('eq') || lower.includes('manager') || lower.includes('emotional intelligence')) {
        setActiveTopic('leadership');
        replyText = "Our Leadership Effectiveness journeys focus on executive presence, emotional intelligence (EQ), strategic vision, conflict de-escalation, and high-impact communication. Led by Founder Anutosh Ghosh (16+ yrs corporate background). We move leaders from theory into real behavioral execution! 🚀";
      }

      // 13. STUDENTS & CAREER READINESS
      else if (lower.includes('student') || lower.includes('career') || lower.includes('interview') || lower.includes('placement') || lower.includes('college') || lower.includes('campus') || lower.includes('resume') || lower.includes('gd')) {
        setActiveTopic('students');
        replyText = "Our Campus-to-Corporate readiness modules empower final-year engineering students & graduates with placement readiness, mock interview simulations, Group Discussion (GD) mastery, articulation confidence, and workplace etiquette! 🎯";
      }

      // 14. CORPORATE TEAM WORKSHOPS
      else if (lower.includes('corporate') || lower.includes('team') || lower.includes('synergy') || lower.includes('company') || lower.includes('firm') || lower.includes('silos')) {
        setActiveTopic('corporates');
        replyText = "We partner with corporate enterprises across IT, Healthcare, Consulting, and Banking to eliminate silos, improve customer satisfaction, and build high-trust, collaborative team dynamics! 🤝";
      }

      // 15. ONLY TRIGGER DETAILS COLLECTION FOR EXPLICIT PRICING / BOOKING / CUSTOM PROPOSALS
      else if (
        lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('charge') || 
        lower.includes('quote') || lower.includes('how much') || lower.includes('custom proposal') || lower.includes('book session') || lower.includes('hire')
      ) {
        setChatLeadStep(1);
        setChatLeadData({ name: '', email: '', phone: '', inquiryTopic: query });
        replyText = "Ooh, that's a fantastic question regarding pricing & custom proposals! To connect you directly with the exact tailored details for your team, may I know your Full Name? 😊";
      }

      // 16. COMPLEX / UNKNOWN SPECIFIC QUERY FALLBACK -> ASK FOR DETAILS!
      else {
        setChatLeadStep(1);
        setChatLeadData({ name: '', email: '', phone: '', inquiryTopic: query });
        replyText = "Ooh, that's a fantastic question! To connect you directly with the exact tailored details for your team, may I know your Full Name? 😊";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      speakResponse(replyText);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Fixed Viewport Stack at Bottom-Right */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[99999] flex flex-col items-end gap-4 pointer-events-auto">
        
        {/* TOP BUTTON: Prominent WhatsApp Trigger */}
        <div className="relative group flex items-center gap-2">
          <div className="hidden group-hover:flex items-center gap-1.5 bg-[#0b0f19] text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-emerald-500/40 shadow-2xl whitespace-nowrap">
            <span>Chat directly on WhatsApp</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative border-2 border-white/40 ring-4 ring-emerald-500/20"
            title="Chat with GroArche on WhatsApp (+91 98366 95655)"
            aria-label="Contact via WhatsApp"
          >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 fill-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-300 border-2 border-slate-950 animate-ping"></span>
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-300 border-2 border-slate-950"></span>
          </a>
        </div>

        {/* BOTTOM BUTTON: Big, Prominent Glowing Gold AI Voice & Chat Trigger */}
        <div className="relative group flex items-center gap-2">
          <div className="hidden group-hover:flex items-center gap-1.5 bg-[#0b0f19] text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-amber-500/40 shadow-2xl whitespace-nowrap">
            <span>Click to speak or chat with GroArche AI</span>
          </div>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="px-6 py-4 sm:px-7 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black shadow-2xl shadow-amber-500/40 hover:scale-108 active:scale-95 transition-all duration-300 flex items-center gap-3 border-2 border-amber-200/60 font-heading text-sm sm:text-base tracking-wide shadow-amber-400/30 cursor-pointer"
            title="✦ Ask GroArche AI (Voice & Text)"
            aria-label="Toggle GroArche AI Voice & Chat Assistant"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center p-1 shadow-md">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <span className="font-extrabold text-slate-950 uppercase tracking-wide">✦ GroArche AI Voice</span>
            <span className="w-3 h-3 rounded-full bg-emerald-950 border-2 border-emerald-400 animate-pulse"></span>
          </button>
        </div>

      </div>

      {/* FLOATING FIXED AI ASSISTANT CHATBOT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-28 right-4 sm:right-8 z-[100000] w-[calc(100vw-2rem)] sm:w-[420px] h-[560px] glass-panel-3d rounded-3xl border-2 border-amber-500/60 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 glow-gold-3d">
          
          {/* Drawer Header */}
          <div className="p-4 bg-[#060911] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#060911] rounded-[10px] flex items-center justify-center text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-white font-heading">GroArche Voice & Chat AI</h4>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Natural Female Voice RAG Agent</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Output Read-Aloud Toggle Button */}
              <button
                onClick={() => {
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                className={`p-2 rounded-xl border transition-colors ${
                  voiceEnabled ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
                title={voiceEnabled ? "Voice Output Active (Click to Mute)" : "Voice Output Muted (Click to Enable)"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setChatOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold rounded-br-none'
                      : 'bg-[#0b0f19] border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isListening && (
              <div className="flex items-center gap-2 p-3.5 bg-amber-500/10 border border-amber-500/40 rounded-2xl text-amber-400 animate-pulse">
                <Mic className="w-4 h-4 animate-bounce" />
                <span className="text-xs font-bold">Listening to your voice... Speak now! 🎙️</span>
              </div>
            )}

            {isTyping && !isListening && (
              <div className="flex items-center gap-2 p-3 bg-[#0b0f19] border border-slate-800 rounded-2xl w-24 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Pill Buttons */}
          <div className="p-2.5 bg-[#060911] border-t border-slate-900 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSend(pill)}
                className="px-3 py-1.5 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-amber-400 font-semibold border border-slate-800 whitespace-nowrap transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Chat Input Box with Microphone Voice Agent Trigger */}
          <div className="p-3.5 bg-[#060911] border-t border-slate-800 flex gap-2.5 items-center">
            {/* Microphone Voice Agent Button */}
            <button
              onClick={toggleVoiceListening}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-500 text-white border-red-400 animate-bounce'
                  : 'bg-[#0b0f19] text-amber-400 border-amber-500/40 hover:bg-slate-800'
              }`}
              title={isListening ? "Listening... Click to stop" : "Click to Speak (Voice Agent)"}
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isListening ? "Listening..." :
                chatLeadStep === 1 ? "Type or speak your Full Name..." :
                chatLeadStep === 2 ? "Type or speak your Email address..." :
                chatLeadStep === 3 ? "Type or speak your Phone/WhatsApp..." :
                "Ask by voice or text..."
              }
              className="flex-1 bg-[#0b0f19] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
            />

            <button
              onClick={() => handleSend()}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
