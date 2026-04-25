"use client";

import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Navigation,
  Phone,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function VolunteerAcceptance() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 px-4">
      {/* Back Button */}
      <Link 
        href="/tasks"
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors w-fit group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Tasks</span>
      </Link>

      {/* Urgent Notification Banner */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-indigo-500 rounded-full" />
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-[0.2em]">New High-Priority Deployment Requested</p>
        </div>
        <span className="text-[10px] font-bold text-indigo-400">EXPIRES IN 14:52</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">Urgent</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Case #REL-8821</span>
                </div>
                <h2 className="text-3xl font-bold font-display text-white">First Aid Station Setup</h2>
                <div className="flex items-center gap-4 text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">District 9, Sector 4C</span>
                  </div>
                  <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">08:00 AM - 04:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Mission Briefing</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Heavy rainfall has caused localized flooding in Sector 4C. We need a team of 4 volunteers to assist in setting up a temporary medical triage unit and distributing basic first aid kits to residents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Required Skills</span>
                <p className="text-xs font-bold text-white">First Aid, CPR, Logistics</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact NGO</span>
                <p className="text-xs font-bold text-white">Red Cross Units A</p>
              </div>
            </div>
          </div>

          {/* Tactical Map Mockup */}
          <div className="glass-panel p-2 h-[350px] relative overflow-hidden">
             <div className="absolute inset-0 bg-[#080808]">
              {/* Simplified Grid & Lines for "Map" look */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-indigo-500/20 rounded-full animate-ping opacity-10" />
              
              {/* Deployment Point */}
              <div className="absolute top-1/3 left-1/3 flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] rotate-45">
                   <Navigation size={20} className="text-white -rotate-45" />
                 </div>
                 <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-bold text-white border border-white/10 uppercase tracking-widest">Target Zone</span>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">High Risk Area</span>
                </div>
              </div>
             </div>
             
             {/* Map Controls Overlay */}
             <div className="absolute top-4 right-4 flex flex-col gap-2">
               <button className="w-10 h-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                 <Phone size={18} />
               </button>
             </div>
          </div>
        </div>

        {/* Right Column: Actions & Safety */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Deployment Status</h3>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                 <span>Capacity</span>
                 <span className="text-white">1 / 4 Slots Filled</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[25%] rounded-full" />
               </div>
            </div>

            <div className="space-y-3 pt-4">
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group">
                <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                Accept Deployment
              </button>
              <button className="w-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-zinc-400 hover:text-red-400 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 group">
                <XCircle size={18} className="group-hover:scale-110 transition-transform" />
                Reject Request
              </button>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <ShieldAlert size={20} />
              <h4 className="text-xs font-bold uppercase tracking-widest">Safety Advisory</h4>
            </div>
            <ul className="space-y-3">
              {[
                'Ensure you have waterproof gear.',
                'Stay with your assigned unit.',
                'Maintain comms at all times.'
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] text-zinc-500 leading-relaxed">
                  <span className="text-red-500/50">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
