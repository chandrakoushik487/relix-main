import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AssignUnitModal({ onClose }) {
  const [unitType, setUnitType] = useState('Rapid Rescue');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sidebar/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-extrabold text-sidebar">Assign New Unit</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Unit Name</label>
            <input type="text" placeholder="e.g. Rescue-5" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Lead Volunteer</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Select Volunteer...</option>
              <option>Marcus Chen</option>
              <option>Elena Rodriguez</option>
              <option>Ananya Kumar</option>
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Unit Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Rapid Rescue', 'Med-Doc', 'Logistics', 'Other'].map((type) => {
                const isActive = unitType === type;
                return (
                  <button 
                    key={type}
                    type="button"
                    onClick={() => setUnitType(type)}
                    className={`border rounded-lg py-2 text-xs font-bold transition-all ${
                      isActive ? 'bg-sidebar text-white border-sidebar' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-hover shadow-md transition-all active:scale-95">
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
