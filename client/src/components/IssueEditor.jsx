'use client';
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Tag, 
  X, 
  CheckCircle2, 
  Loader2,
  Info
} from 'lucide-react';

const IssueEditor = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    problem_type: '',
    urgency_level: 'Medium',
    peopleAffected: 1,
    area: '',
    issue_description: '',
    latitude: 0,
    longitude: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const problemTypes = [
    'Natural Disaster', 
    'Health', 
    'Infrastructure', 
    'Logistics', 
    'Food Security', 
    'Water & Sanitation',
    'Safety'
  ];
  
  const urgencyLevels = ['Critical', 'High', 'Medium', 'Stable'];

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Required';
    if (!formData.problem_type) newErrors.problem_type = 'Required';
    if (!formData.area) newErrors.area = 'Required';
    if (formData.peopleAffected < 1) newErrors.peopleAffected = 'Must be at least 1';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'peopleAffected' ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        if(onSubmit) await onSubmit(formData);
      } catch (err) {
        console.error("Submission failed:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card p-8 border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight">Report Incident</h2>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Field Data Entry Intelligence</p>
        </div>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-500 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
            <Info size={12} />
            Incident Title
          </label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g. Severe Flooding - Sector 4"
            className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-800" 
          />
          {errors.title && <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.title}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              <Tag size={12} />
              Category
            </label>
            <select 
              name="problem_type" 
              value={formData.problem_type} 
              onChange={handleChange} 
              className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
            >
              <option value="" disabled className="bg-zinc-900">Select Category...</option>
              {problemTypes.map(pt => <option key={pt} value={pt} className="bg-zinc-900">{pt}</option>)}
            </select>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              <AlertTriangle size={12} />
              Severity
            </label>
            <select 
              name="urgency_level" 
              value={formData.urgency_level} 
              onChange={handleChange} 
              className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
            >
              {urgencyLevels.map(ul => <option key={ul} value={ul} className="bg-zinc-900">{ul}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              <MapPin size={12} />
              Region / Area
            </label>
            <input 
              type="text" 
              name="area" 
              value={formData.area} 
              onChange={handleChange} 
              placeholder="e.g. Hyderabad East"
              className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-800" 
            />
            {errors.area && <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.area}</span>}
          </div>

          {/* People Affected */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              <Users size={12} />
              Impacted Count
            </label>
            <input 
              type="number" 
              min="1" 
              name="peopleAffected" 
              value={formData.peopleAffected} 
              onChange={handleChange} 
              className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" 
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
            Description & Intelligence
          </label>
          <textarea 
            name="issue_description" 
            value={formData.issue_description} 
            onChange={handleChange} 
            rows="3"
            placeholder="Provide situational awareness and details..."
            className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-800 resize-none"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center justify-center gap-2 disabled:opacity-50 group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <CheckCircle2 size={20} />
                <span>Initialize Mission Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueEditor;
