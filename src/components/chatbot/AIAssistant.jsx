import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, ChevronRight, MessageSquare } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

// Modular API Configuration for n8n Webhook / OpenAI / Gemini / Custom Backend Integration
export const CHATBOT_CONFIG = {
  API_URL: process.env.REACT_APP_CHATBOT_API_URL || "https://n8n.groarche.pro/webhook/ai-assistant", // Replace with your live n8n webhook endpoint
  ENABLE_LIVE_API: false, // Set to true when n8n webhook or AI backend is live
};

export default function AIAssistant({ isOpen, setIsOpen, onOpenLeadGen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi 👋 How can GroArche help you grow today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPills = [
    "Career Readiness",
    "Leadership Development",
    "Corporate Training",
    "Communication Skills",
    "Interview Preparation",
    "Executive Mentoring",
    "Student Programs",
    "Talk to GroArche"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    if (CHATBOT_CONFIG.ENABLE_LIVE_API && CHATBOT_CONFIG.API_URL) {
      try {
        const response = await fetch(CHATBOT_CONFIG.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, timestamp: new Date().toISOString() })
        });
        const data = await response.json();
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply || data.message || "Thank you for reaching out to GroArche Learning Solutions.",
          cta: data.cta || "Request Proposal Consultation",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn("Live Chatbot API offline, falling back to GroArche Knowledge Base.", err);
      }
    }

    setTimeout(() => {
      let botReply = getKnowledgeResponse(query);
      
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.text,
        cta: botReply.cta,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const getKnowledgeResponse = (q) => {
    const lower = q.toLowerCase();

    if (lower.includes('leadership')) {
      return {
        text: "Our Leadership Effectiveness programs focus on strategic vision, executive presence, emotional intelligence (EQ), and team communication. Led by Founder Anutosh Ghosh (16+ yrs corporate experience across Wipro & Deloitte).",
        cta: "Build High-Performing Teams"
      };
    }
    if (lower.includes('student') || lower.includes('career') || lower.includes('interview') || lower.includes('placement')) {
      return {
        text: "Our Career Readiness modules help final-year engineering students & graduates transition smoothly from campus to corporate life through placement readiness, interview simulations, and workplace communication.",
        cta: "Start Your Career Journey"
      };
    }
    if (lower.includes('corporate') || lower.includes('team')) {
      return {
        text: "We partner with corporate organizations (e.g. ACH & Associates, Bhuwania & Associates) across IT Services, Healthcare, Consulting, Manufacturing, and Banking to build communication and team effectiveness.",
        cta: "Explore Corporate Programs"
      };
    }
    if (lower.includes('communication') || lower.includes('executive') || lower.includes('mentor')) {
      return {
        text: "GroArche provides 1-on-1 executive mentoring and workshops in leadership communication, executive presence, and influence to strengthen personal brand and career effectiveness.",
        cta: "Begin Your Growth Journey"
      };
    }
    if (lower.includes('talk') || lower.includes('contact') || lower.includes('anutosh') || lower.includes('phone') || lower.includes('whatsapp')) {
      return {
        text: "You can connect directly with Founder & Director Anutosh Ghosh via Phone/WhatsApp (+91 98366 95655) or Email (contact@groarche.pro).",
        cta: "Connect on WhatsApp"
      };
    }

    return {
      text: "At GroArche Learning Solutions, we turn potential into meaningful performance through facilitation-driven experiential learning. How can we help transform your team or career today?",
      cta: "Explore the GroArche Way"
    };
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border border-amber-500/40 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
        title="GroArche AI Assistant"
      >
        <Bot className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide text-white uppercase pr-1">
          AI Assistant
        </span>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      </button>

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] glass-panel rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#060911] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">GroArche AI Assistant</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>Human Performance Consultancy KB</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Minimize chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-400 text-slate-950 font-semibold rounded-tr-none shadow-md'
                      : 'bg-[#0b0f19] border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.cta && (
                    <button
                      onClick={() => { setIsOpen(false); onOpenLeadGen(); }}
                      className="mt-3 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 hover:bg-amber-300 transition-colors shadow"
                    >
                      <span>{m.cta}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-400 text-xs p-2.5 bg-[#0b0f19] rounded-xl w-fit border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Option Pills */}
          <div className="px-3 py-2 bg-[#060911] border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSend(pill)}
                className="px-3 py-1 rounded-full bg-[#0b0f19] hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 text-[11px] font-medium whitespace-nowrap transition-all"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#060911] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about GroArche programs & facilitation..."
              className="flex-1 bg-[#0b0f19] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
