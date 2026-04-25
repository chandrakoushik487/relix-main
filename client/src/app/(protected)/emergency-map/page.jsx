'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Filter, 
  MapPin, 
  Search, 
  Layers, 
  Navigation, 
  AlertCircle, 
  Crosshair, 
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function EmergencyMapPage() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeLayer, setActiveLayer] = useState('Heatmap');
  const mapContainerRef = useRef(null);

  // Mock data representing incidents on a map
  const mockIncidents = [
    { id: 1, title: 'Severe Flooding', severity: 'Critical', region: 'Sector 4C', status: 'Active', unit: 'Rescue-1', desc: 'Water levels rising rapidly in low altitude areas. Immediate evacuation advised.', x: 30, y: 40, time: '2m ago' },
    { id: 2, title: 'Medical Supply Shortage', severity: 'High', region: 'District 9', status: 'Pending', unit: 'Unassigned', desc: 'Field hospital Alpha running low on trauma kits and insulin.', x: 60, y: 30, time: '14m ago' },
    { id: 3, title: 'Blocked Supply Route', severity: 'Medium', region: 'Zone B', status: 'In Progress', unit: 'Logistics-4', desc: 'Debris blocking main arterial road. Cleanup crew dispatched.', x: 45, y: 70, time: '28m ago' },
    { id: 4, title: 'Power Grid Failure', severity: 'High', region: 'Old Town', status: 'Active', unit: 'Engineer-2', desc: 'Total blackout reported across 4 blocks. Hospitals on backup.', x: 75, y: 55, time: '1h ago' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] w-full flex relative overflow-hidden bg-[#050505]">
      
      {/* 1. Left Control Panel */}
      <div className={`h-full bg-[#0A0A0A] border-r border-[#1A1A1A] flex flex-col z-20 transition-all duration-500 shadow-2xl ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-[320px] opacity-100'}`}>
        <div className="p-6 border-b border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-display tracking-tight">Active Map</h2>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text" 
              placeholder="Search coordinates or IDs..." 
              className="w-full bg-[#030303] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Layer Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Layers size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Map Layers</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Heatmap', 'Satellite', 'Terrain', 'Traffic'].map(layer => (
                <button 
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    activeLayer === layer 
                      ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                      : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Filters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Filter size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Severity Toggles</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Critical', color: 'bg-red-500', count: 2 },
                { label: 'High Priority', color: 'bg-amber-500', count: 4 },
                { label: 'Moderate', color: 'bg-indigo-500', count: 8 },
                { label: 'Observation', color: 'bg-emerald-500', count: 12 },
              ].map(item => (
                <label key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="hidden peer" defaultChecked />
                    <div className="w-4 h-4 border border-white/10 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-all">
                      <div className="w-1.5 h-1.5 bg-white rounded-sm opacity-0 peer-checked:opacity-100" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-xs font-bold text-zinc-300">{item.label}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600">{item.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick List */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-zinc-500">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Recent Alerts</span>
            </div>
            <div className="space-y-3">
              {mockIncidents.slice(0, 3).map(incident => (
                <div 
                  key={incident.id} 
                  onClick={() => setSelectedIncident(incident)}
                  className="p-3 rounded-xl bg-[#030303] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{incident.id}</span>
                    <span className="text-[9px] font-bold text-zinc-600">{incident.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white mb-1">{incident.title}</h4>
                  <div className="flex items-center gap-2">
                    <MapPin size={10} className="text-zinc-600" />
                    <span className="text-[10px] font-bold text-zinc-500">{incident.region}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Map Area */}
      <div className="flex-1 relative bg-[#030303]">
        {/* Map UI Elements */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl"
          >
            {isSidebarCollapsed ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
        </div>

        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
           <div className="flex items-center gap-3 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-2xl shadow-2xl">
              <Activity className="text-indigo-400" size={16} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global SVI Index</span>
                <span className="text-sm font-bold text-white">0.74 <span className="text-emerald-400 text-[10px] ml-1">↑ 2.4%</span></span>
              </div>
           </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-10 right-6 z-10 flex flex-col gap-3">
          <button className="w-12 h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-2xl">
            <Crosshair size={20} />
          </button>
          <button className="w-12 h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-2xl">
            <Navigation size={20} />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-10 left-6 z-10 p-4 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Critical</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Warning</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Resource</span>
           </div>
        </div>

        {/* Map Canvas Placeholder */}
        <div className="absolute inset-0 z-0 overflow-hidden" ref={mapContainerRef}>
          {/* Dark Grid Background */}
          <div className="absolute inset-0 bg-[#030303]" style={{ 
            backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Faint World Map/Terrain Trace */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen overflow-hidden">
             <div className="w-full h-full transform scale-150 blur-[2px]" style={{ 
               background: 'radial-gradient(circle at 30% 40%, #1e1b4b 0%, transparent 40%), radial-gradient(circle at 70% 60%, #1e1b4b 0%, transparent 40%)' 
             }} />
          </div>

          {/* Interactive Pins */}
          {mockIncidents.map((incident) => {
            let colorClass = 'text-red-500 bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
            if (incident.severity === 'High') colorClass = 'text-amber-500 bg-amber-500/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]';
            if (incident.severity === 'Medium') colorClass = 'text-indigo-500 bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]';

            return (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-125 z-10 ${selectedIncident?.id === incident.id ? 'scale-150 z-20' : ''}`}
                style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
              >
                <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${colorClass}`}>
                  <MapPin size={20} />
                  {incident.severity === 'Critical' && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-red-500 animate-ping opacity-40" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* 3. Detail Drawer (Slide-in) */}
        <div className={`absolute top-0 right-0 bottom-0 w-[400px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/5 transform transition-all duration-500 ease-in-out z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col ${selectedIncident ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedIncident && (
            <>
              <div className="p-8 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16" />
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all font-bold"
                >
                  &times;
                </button>
                
                <div className="space-y-4 relative">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md border ${
                      selectedIncident.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {selectedIncident.severity}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 tracking-widest">{selectedIncident.region}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display leading-tight">{selectedIncident.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Clock size={14} />
                    <span className="text-xs font-medium">Reported {selectedIncident.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Context & Intel</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">{selectedIncident.desc}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Live Status</span>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                       <span className="text-sm font-bold text-white uppercase">{selectedIncident.status}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Deployed Unit</span>
                    <span className="text-sm font-bold text-white">{selectedIncident.unit}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Regional Impact</h4>
                   <div className="glass-card p-4 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-zinc-400">Projected Casualties</span>
                         <span className="text-xs font-bold text-white">0 (Evacuated)</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-zinc-400">Estimated SVI Change</span>
                         <span className="text-xs font-bold text-amber-400">+0.12 Critical</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-[#0A0A0A]">
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 group">
                  Deploy Countermeasures <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
