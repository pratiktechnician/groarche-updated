import React, { useState, useEffect } from 'react';
import { X, Database, Download, Trash2, Mail, Phone, MessageCircle, RefreshCw, Search } from 'lucide-react';

export default function AdminLeadViewerModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem('groarche_leads') || '[]');
      setLeads(storedLeads);
    } catch (err) {
      console.error("Failed to load leads from localStorage:", err);
      setLeads([]);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all stored lead records?")) {
      localStorage.removeItem('groarche_leads');
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["ID", "Date", "Name", "Email", "Phone", "Organization", "Service Goal", "Target Audience", "Message"];
    const rows = leads.map(l => [
      `"${l.id || ''}"`,
      `"${l.formattedDate || l.timestamp || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.organization || '').replace(/"/g, '""')}"`,
      `"${(l.lookingFor || '').replace(/"/g, '""')}"`,
      `"${(l.trainingFor || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GroArche_Website_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter(l =>
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.organization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-[#060911]/95 backdrop-blur-xl">
      <div className="glass-panel-3d max-w-5xl w-full max-h-[90vh] rounded-3xl p-6 sm:p-8 border border-amber-500/50 relative shadow-2xl flex flex-col overflow-hidden glow-gold-3d">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">GroArche Lead Database</h3>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {leads.length} Total Proposal Enquiries Captured
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-bold text-xs shadow flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV / Excel</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-colors"
                title="Clear All Leads"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="py-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter leads by name, email, phone, or organization..."
              className="w-full bg-[#060911] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={loadLeads}
            className="p-2 rounded-xl bg-[#060911] border border-slate-800 text-slate-400 hover:text-amber-400"
            title="Refresh Leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto rounded-2xl border border-slate-800 bg-[#060911]/80">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Database className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Lead Submissions Found</h4>
              <p className="text-xs text-slate-500">
                When visitors complete the proposal form, their enquiries will automatically appear in this dashboard.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f19] text-amber-400 font-mono text-[11px] uppercase border-b border-slate-800 sticky top-0">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">Service Goal</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-amber-500/10 transition-colors">
                    <td className="p-3 whitespace-nowrap text-slate-400 font-mono text-[10px]">
                      {lead.formattedDate || lead.timestamp}
                    </td>
                    <td className="p-3 font-bold text-white whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="p-3 space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-200">
                        <Mail className="w-3 h-3 text-amber-400" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{lead.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300 whitespace-nowrap">
                      {lead.organization || 'Individual'}
                    </td>
                    <td className="p-3 font-medium text-amber-300">
                      {lead.lookingFor}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <a
                        href={`https://wa.me/919836695655?text=${encodeURIComponent(`Hi ${lead.name}, regarding your GroArche inquiry for ${lead.lookingFor}:`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold inline-flex items-center gap-1 hover:bg-emerald-500/30"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Contact WA</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900">
          <span>Shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">Ctrl + Shift + L</kbd> anytime to toggle this Lead Dashboard.</span>
          <span>Emailed to: <strong className="text-amber-400">contact@groarche.pro</strong></span>
        </div>

      </div>
    </div>
  );
}
