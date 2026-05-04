'use client';
import React, { useState } from 'react';
import { X, Shield, Users, MapPin, Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { taskService } from '@/services/taskService';

export default function AssignUnitModal({ onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unitType, setUnitType] = useState('Rapid Rescue');
  const [formData, setFormData] = useState({
    title: '',
    volunteer: 'Marcus Chen',
    region: 'Zone A',
    priority: 'High'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await taskService.createTask({
        title: `${unitType}: ${formData.title}`,
        volunteer: formData.volunteer,
        region: formData.region,
        priority: formData.priority,
        type: unitType,
        status: 'Pending'
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Assignment failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="glass-card w-full max-w-md overflow-hidden border-white/10 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">Assign Unit</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Operational Deployment Directive</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest ml-1">
                <Shield size={12} /> Unit Identification
              </label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Echo-5 Rescue" 
                className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-800" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest ml-1">
                  <Users size={12} /> Lead Volunteer
                </label>
                <select 
                  name="volunteer"
                  value={formData.volunteer}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                >
                  <option className="bg-zinc-900">Marcus Chen</option>
                  <option className="bg-zinc-900">Elena Rodriguez</option>
                  <option className="bg-zinc-900">Ananya Kumar</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest ml-1">
                  <MapPin size={12} /> Operational Zone
                </label>
                <select 
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                >
                  <option className="bg-zinc-900">Zone A</option>
                  <option className="bg-zinc-900">Zone B</option>
                  <option className="bg-zinc-900">Zone C</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-500 mb-3 uppercase tracking-widest block ml-1">Specialized Unit Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Rapid Rescue', 'Med-Doc', 'Logistics', 'Security'].map((type) => {
                  const isActive = unitType === type;
                  return (
                    <button 
                      key={type}
                      type="button"
                      onClick={() => setUnitType(type)}
                      className={`border rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                        isActive 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                          : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-6 border-t border-white/5 bg-white/[0.01]">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 py-3.5 text-xs font-bold text-zinc-400 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
              Confirm Deployment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
