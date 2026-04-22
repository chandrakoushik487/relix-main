import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateTicketModal({ onClose }) {
  const [severity, setSeverity] = useState('Medium');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sidebar/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-extrabold text-sidebar">Create New Ticket</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
            <input type="text" placeholder="Brief description of the incident" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
              <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option>Water</option>
                <option>Health</option>
                <option>Housing</option>
                <option>Education</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Region</label>
              <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option>Zone A</option>
                <option>Zone B</option>
                <option>Zone C</option>
                <option>Zone D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Severity</label>
            <div className="grid grid-cols-4 gap-2">
              {['Critical', 'High', 'Medium', 'Low'].map((level) => {
                let colorClass = '';
                if (level === 'Critical') colorClass = severity === 'Critical' ? 'bg-critical text-white border-critical' : 'text-critical border-slate-200 hover:border-critical';
                if (level === 'High') colorClass = severity === 'High' ? 'bg-high text-white border-high' : 'text-high border-slate-200 hover:border-high';
                if (level === 'Medium') colorClass = severity === 'Medium' ? 'bg-medium text-white border-medium' : 'text-medium border-slate-200 hover:border-medium';
                if (level === 'Low') colorClass = severity === 'Low' ? 'bg-low text-white border-low' : 'text-low border-slate-200 hover:border-low';
                
                return (
                  <button 
                    key={level}
                    type="button"
                    onClick={() => setSeverity(level)}
                    className={`border rounded-lg py-2 text-xs font-bold transition-all ${colorClass}`}
                  >
                    {level}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Description</label>
            <textarea rows={4} placeholder="Detailed notes about the situation..." className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Assign To</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Unassigned</option>
              <option>Rapid Rescue 1 (Marcus Chen)</option>
              <option>Med/Doc Lead (Elena Rodriguez)</option>
              <option>Logistics Lead (Ananya Kumar)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-hover shadow-md transition-all active:scale-95">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
