'use client';
import React from 'react';
import { Search, AlertTriangle, Package, Activity, ArrowRight } from 'lucide-react';

export default function IncidentFeedPage() {
  const incidents = [
    { id: 1, title: 'Severe Flooding - District 9', severity: 'Critical', category: 'Infrastructure', desc: 'Water levels reached +2.4m. Evacuation teams deployed to primary coordinates.', time: '4 mins ago', reporter: 'Ops-Delta', icon: AlertTriangle },
    { id: 2, title: 'Medical Resupply Successful', severity: 'Low', category: 'Medical', desc: 'Resource Drop Point D has received the critical medical kits. Distribution started.', time: '14 mins ago', reporter: 'Logi-Unit 2', icon: Package },
    { id: 3, title: 'Shelter Capacity Warning — Zone B', severity: 'High', category: 'Status', desc: 'Zone B refugee shelter at 94% capacity. Overflow plan activation recommended.', time: '28 mins ago', reporter: 'Shelter-Ops', icon: Activity },
    { id: 4, title: 'Bridge Collapse Route 4', severity: 'Critical', category: 'Infrastructure', desc: 'Main transit route severed. Rerouting all logistics via Route 7 immediately.', time: '1 hr ago', reporter: 'Command-Center', icon: AlertTriangle },
    { id: 5, title: 'Potable Water Distribution', severity: 'Medium', category: 'Water/Food', desc: 'Water truck 5 dispatching to Sector C. Expected arrival in 30 minutes.', time: '2 hrs ago', reporter: 'Water-Ops', icon: Package },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-sidebar mb-1">Incident Feed</h1>
        <p className="text-sm text-text-light">Live log of all reported incidents across active operations.</p>
      </div>

      {/* Top Bar: Search + Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search incident feed..." 
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50">All Severities</button>
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50">All Categories</button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {incidents.map((incident) => {
          let borderColor = 'border-l-low';
          let badgeBg = 'bg-low/10 text-low border-low/20';
          let iconBg = 'bg-low/10 text-low';

          if (incident.severity === 'Critical') {
            borderColor = 'border-l-critical';
            badgeBg = 'bg-critical/10 text-critical border-critical/20';
            iconBg = 'bg-critical/10 text-critical';
          } else if (incident.severity === 'High') {
            borderColor = 'border-l-high';
            badgeBg = 'bg-high/10 text-high border-high/20';
            iconBg = 'bg-high/10 text-high';
          } else if (incident.severity === 'Medium') {
            borderColor = 'border-l-medium';
            badgeBg = 'bg-medium/10 text-medium border-medium/20';
            iconBg = 'bg-medium/10 text-medium';
          }

          const IconComponent = incident.icon;

          return (
            <div key={incident.id} className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 pl-6 border-l-4 ${borderColor} hover:shadow-md transition-shadow group`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="text-base font-bold text-sidebar group-hover:text-primary transition-colors">{incident.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wider border ${badgeBg}`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-text-light leading-relaxed mb-4">{incident.desc}</p>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 font-medium pt-3 border-t border-slate-100">
                    <div>
                      <span>🕒 {incident.time}</span>
                      <span className="mx-2 text-slate-300">•</span>
                      <span>👤 Reported by {incident.reporter}</span>
                    </div>
                    <button className="flex items-center gap-1 font-bold text-primary hover:text-primary-hover group-hover:underline">
                      Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 bg-white border border-slate-200 text-sm font-bold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
          Load More Incidents
        </button>
      </div>

    </div>
  );
}
