import React, { useState } from 'react';
import { X } from 'lucide-react';
import { incidentService } from '@/services/incidentService';

const defaultFormData = {
  title: '',
  category: 'Water',
  region: 'Zone A',
  severity: 'Medium',
  description: '',
  assignedTo: 'Unassigned'
};

export default function CreateTicketModal({ onClose }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title.trim()) {
      setErrorMessage('Please provide a ticket title.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await incidentService.createIncident({
        title: formData.title,
        problem_type: formData.category,
        urgency_level: formData.severity,
        area: formData.region,
        issue_description: formData.description,
        assigned_to: formData.assignedTo
      });
      onClose();
    } catch (error) {
      console.error('Ticket submission failed:', error);
      setErrorMessage(error.message || 'Unable to submit ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sidebar/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-extrabold text-sidebar">Create New Ticket</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Brief description of the incident"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Water</option>
                <option>Health</option>
                <option>Housing</option>
                <option>Education</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
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
                const active = formData.severity === level;
                const colorClass = active
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'text-slate-700 border-slate-200 hover:border-indigo-500';
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, severity: level }))}
                    className={`border rounded-lg py-2 text-xs font-bold transition-all ${colorClass}`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed notes about the situation..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option>Unassigned</option>
              <option>Rapid Rescue 1 (Marcus Chen)</option>
              <option>Med/Doc Lead (Elena Rodriguez)</option>
              <option>Logistics Lead (Ananya Kumar)</option>
            </select>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 font-semibold">{errorMessage}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-hover shadow-md transition-all active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
