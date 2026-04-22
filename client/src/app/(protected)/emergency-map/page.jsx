'use client';
import React, { useState } from 'react';
import { Filter, MapPin, Search } from 'lucide-react';

export default function EmergencyMapPage() {
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Mock data representing incidents on a map
  const mockIncidents = [
    { id: 1, title: 'Severe Flooding', severity: 'Critical', region: 'Zone C', status: 'Active', unit: 'Rescue-1', desc: 'Water levels rising rapidly in low altitude areas.', x: 30, y: 40 },
    { id: 2, title: 'Medical Supply Shortage', severity: 'High', region: 'Zone A', status: 'Pending', unit: 'Unassigned', desc: 'Field hospital Alpha running low on trauma kits.', x: 60, y: 30 },
    { id: 3, title: 'Blocked Supply Route', severity: 'Medium', region: 'Zone B', status: 'In Progress', unit: 'Logistics-4', desc: 'Debris blocking main arterial road.', x: 45, y: 70 },
  ];

  return (
    <div className="flex h-full w-full relative bg-slate-200 overflow-hidden">
      
      {/* 1. Left Filter Sidebar */}
      <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-extrabold text-sidebar text-lg">Filters</h2>
        </div>
        <div className="p-4 space-y-5 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block uppercase tracking-wider">Region</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-primary">
              <option>All Regions</option>
              <option>Zone A</option>
              <option>Zone B</option>
              <option>Zone C</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block uppercase tracking-wider">Severity</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-critical focus:ring-critical" defaultChecked />
                <span className="w-2.5 h-2.5 rounded-full bg-critical"></span> Critical
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-high focus:ring-high" defaultChecked />
                <span className="w-2.5 h-2.5 rounded-full bg-high"></span> High
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-medium focus:ring-medium" defaultChecked />
                <span className="w-2.5 h-2.5 rounded-full bg-medium"></span> Medium
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-low focus:ring-low" defaultChecked />
                <span className="w-2.5 h-2.5 rounded-full bg-low"></span> Low
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block uppercase tracking-wider">Category</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-primary">
              <option>All Categories</option>
              <option>Medical</option>
              <option>Infrastructure</option>
              <option>Water/Food</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t border-slate-100 mt-auto">
          <button className="w-full bg-sidebar hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-sm transition-all active:scale-[0.98] shadow flex items-center justify-center gap-2">
            <Filter size={16} /> Apply Filters
          </button>
        </div>
      </div>

      {/* 2. Main Area: Full Map Overlay Placeholder */}
      <div className="flex-1 relative">
        {/* Mapbox Map Placeholder Graphics */}
        <div className="absolute inset-0 bg-slate-100" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/50 to-transparent"></div>

        {/* Top-right incident count chip */}
        <div className="absolute top-4 right-4 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 border border-slate-200 z-20">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-bold text-sidebar">{mockIncidents.length} Visible Incidents</span>
        </div>

        {/* Bottom-left Map Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-4 border border-slate-200 z-20 flex flex-col gap-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Legend</h4>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="w-3 h-3 rounded-full bg-critical shadow-sm"></span> Critical</div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="w-3 h-3 rounded-full bg-high shadow-sm"></span> High</div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="w-3 h-3 rounded-full bg-medium shadow-sm"></span> Medium</div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="w-3 h-3 rounded-full bg-low shadow-sm"></span> Low</div>
        </div>

        {/* Map Pins */}
        {mockIncidents.map((incident) => {
          let bg = 'bg-low';
          if (incident.severity === 'Critical') bg = 'bg-critical';
          else if (incident.severity === 'High') bg = 'bg-high';
          else if (incident.severity === 'Medium') bg = 'bg-medium';

          return (
            <button
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
            >
              <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-transform group-hover:scale-125 focus:ring-4 focus:ring-primary/50 relative`}>
                <MapPin size={16} />
                {bg === 'bg-critical' && <div className="absolute inset-0 rounded-full border-2 border-critical animate-ping opacity-75"></div>}
              </div>
            </button>
          )
        })}

        {/* 3. Slide-in Detail Drawer */}
        <div className={`absolute top-0 right-0 bottom-0 w-[340px] bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-30 flex flex-col ${selectedIncident ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedIncident && (
            <>
              <div className="p-6 border-b border-slate-100 relative">
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors font-bold"
                >
                  &times;
                </button>
                <div className="flex items-center gap-2 mb-3 mt-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded text-white ${
                    selectedIncident.severity === 'Critical' ? 'bg-critical' : selectedIncident.severity === 'High' ? 'bg-high' : 'bg-medium'
                  }`}>
                    {selectedIncident.severity}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{selectedIncident.region}</span>
                </div>
                <h3 className="text-xl font-extrabold text-sidebar leading-tight">{selectedIncident.title}</h3>
              </div>
              
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedIncident.desc}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-sm font-bold text-sidebar">{selectedIncident.status}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Unit</span>
                    <span className="text-sm font-bold text-sidebar">{selectedIncident.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white">
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                  View Full Details
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
