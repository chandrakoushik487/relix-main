'use client';
import React, { useState } from 'react';

const IssueEditor = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    problem_type: '',
    urgency_level: '',
    people_affected: 1,
    location: '',
    description: '',
    lat: null, 
    lng: null
  });

  const [errors, setErrors] = useState({});

  const problemTypes = ['water', 'health', 'education', 'shelter', 'food', 'other'];
  const urgencyLevels = ['high', 'medium', 'low'];

  const validate = () => {
    const newErrors = {};
    if (!formData.problem_type) newErrors.problem_type = 'Required';
    if (!formData.urgency_level) newErrors.urgency_level = 'Required';
    if (!formData.location) newErrors.location = 'Required';
    if (formData.people_affected < 1) newErrors.people_affected = 'Must be at least 1';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if(onSubmit) onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Issue Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Problem Type dropdown*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Problem Type</label>
          <select name="problem_type" value={formData.problem_type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
            <option value="" disabled>Select problem type...</option>
            {problemTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
          </select>
          {errors.problem_type && <span className="text-red-500 text-xs">{errors.problem_type}</span>}
        </div>

        {/* Urgency Level dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
          <select name="urgency_level" value={formData.urgency_level} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
            <option value="" disabled>Select urgency...</option>
            {urgencyLevels.map(ul => <option key={ul} value={ul}>{ul}</option>)}
          </select>
          {errors.urgency_level && <span className="text-red-500 text-xs">{errors.urgency_level}</span>}
        </div>

        {/* People Affected */}
        <div>
          <label className="block text-sm font-medium text-gray-700">People Affected</label>
          <input type="number" min="1" name="people_affected" value={formData.people_affected} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          {errors.people_affected && <span className="text-red-500 text-xs">{errors.people_affected}</span>}
        </div>

        {/* Location String */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          {errors.location && <span className="text-red-500 text-xs">{errors.location}</span>}
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Submit Issue Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueEditor;
