'use client';
import React from 'react';
import { MapPin, Navigation, CheckCircle2, Clock, AlertTriangle, Zap } from 'lucide-react';

export default function VolunteerMap() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">My Task Map</h2>
          <p className="text-zinc-500 text-sm mt-1">View your assigned tasks and navigate to locations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all">
            <Navigation size={14} />
            Center on Me
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6">
        {[
          { icon: AlertTriangle, label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { icon: Clock, label: 'High Priority', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { icon: Zap, label: 'Medium', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { icon: CheckCircle2, label: 'Completed', color: 'text-zinc-500', bg: 'bg-zinc-800/50', border: 'border-zinc-700' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center`}>
              <item.icon size={12} className={item.color} />
            </div>
            <span className="text-[11px] text-zinc-500 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Map Container */}
      <div className="glass-card h-[600px] relative overflow-hidden border-white/5">
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(#6366F1 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>

          {/* Grid lines for map effect */}
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#6366F1" strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#6366F1" strokeWidth="1" />
          </svg>
        </div>

        {/* Task Pins */}
        <div className="absolute top-[35%] left-[30%] flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-bounce"></div>
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Critical</p>
            <p className="text-[9px] text-zinc-400">Flood Relief - Sector 7</p>
          </div>
        </div>

        <div className="absolute top-[55%] left-[55%] flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">High</p>
            <p className="text-[9px] text-zinc-400">Medical Supply - Central</p>
          </div>
        </div>

        <div className="absolute top-[40%] left-[70%] flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white/50"></div>
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Medium</p>
            <p className="text-[9px] text-zinc-400">Shelter Setup - Zone 4</p>
          </div>
        </div>

        {/* User Location Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600/10 backdrop-blur-md px-2 py-1 rounded border border-indigo-500/20">
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">You</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all">
            <Navigation size={16} />
          </button>
        </div>

        {/* Task List Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Nearby Tasks</h4>
            <span className="text-[10px] font-bold text-indigo-400">3 Active</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: 'Flood Relief', location: 'Sector 7', priority: 'Critical', eta: '4 min' },
              { title: 'Medical Supply', location: 'Central Camp', priority: 'High', eta: '12 min' },
              { title: 'Shelter Setup', location: 'Zone 4', priority: 'Medium', eta: '25 min' },
            ].map((task, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    task.priority === 'Critical' ? 'bg-red-500' :
                    task.priority === 'High' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`} />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{task.priority}</span>
                </div>
                <h5 className="text-xs font-bold text-white mb-1">{task.title}</h5>
                <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                  <MapPin size={8} />
                  {task.location}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-indigo-400 mt-1">
                  <Clock size={8} />
                  ETA: {task.eta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
