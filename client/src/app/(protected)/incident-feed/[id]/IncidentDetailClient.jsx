"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle, 
  MessageSquare, 
  Share2, 
  Activity,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function IncidentDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const incident = {
    id: params.id,
    title: 'Flash Flood Emergency: West District',
    status: 'Critical',
    category: 'Natural Disaster',
    location: 'Bhimavaram, Andhra Pradesh',
    timestamp: '14 mins ago',
    reporter: 'Civil Ops Unit 4',
    description: 'Rapid water level rise detected in the West District drainage canal. Immediate evacuation required for low-lying sectors. Structural integrity of the main bridge is being monitored.',
    impactScore: 88,
    priority: 'Level 1',
    assignedTo: 'Delta Team',
    timeline: [
      { time: '10:45 AM', event: 'Initial alert triggered by sensor S-44', type: 'system' },
      { time: '10:52 AM', event: 'Visual confirmation from ground unit', type: 'user' },
      { time: '11:00 AM', event: 'Priority elevated to Critical', type: 'action' },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 border border-white/10 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Back to Feed</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
            <Share2 size={18} />
          </button>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-xl">
            Deploy Response
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="glass-card p-10 space-y-8 bg-[#070707]">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-500 uppercase tracking-widest">
                     {incident.status}
                   </span>
                   <span className="text-zinc-600 text-xs font-mono">{incident.id}</span>
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">{incident.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-zinc-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-400" />
                    <span className="text-sm">{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-zinc-600" />
                    <span className="text-sm">{incident.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                 <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center p-4">
                    <span className="text-2xl font-bold text-indigo-400">{incident.impactScore}</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center mt-1">Impact</span>
                 </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 gap-8">
              {['overview', 'timeline', 'resources'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                    activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="pt-4 min-h-[200px]">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Situation Report</h3>
                    <p className="text-zinc-400 leading-relaxed text-base">{incident.description}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Category', value: incident.category, icon: Info },
                      { label: 'Priority', value: incident.priority, icon: Activity },
                      { label: 'Team', value: incident.assignedTo, icon: Shield },
                      { label: 'Reporter', value: incident.reporter, icon: User },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                          <item.icon size={12} /> {item.label}
                        </div>
                        <div className="text-sm font-bold text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
                  {incident.timeline.map((entry, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {i !== incident.timeline.length - 1 && (
                        <div className="absolute top-8 left-4 bottom-[-24px] w-px bg-white/5" />
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 z-10 ${
                        entry.type === 'system' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-zinc-500'
                      }`}>
                        {entry.type === 'system' ? <Activity size={14} /> : <CheckCircle2 size={14} />}
                      </div>
                      <div className="pt-1.5 space-y-1">
                        <div className="text-xs font-bold text-white">{entry.event}</div>
                        <div className="text-[10px] text-zinc-600 font-mono tracking-widest">{entry.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Discussion / Comments Placeholder */}
          <div className="glass-card p-8 bg-[#070707] flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 text-zinc-500 group-hover:text-white transition-colors">
                   <MessageSquare size={20} />
                 </div>
                <div>
                   <div className="text-sm font-bold text-white">Incident Debrief</div>
                   <div className="text-xs text-zinc-600">8 responses from coordination unit</div>
                </div>
             </div>
             <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1" />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           {/* Map Preview Placeholder */}
           <div className="glass-card overflow-hidden h-64 relative group bg-[#070707]">
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                 <div className="text-zinc-800 animate-pulse">
                    <MapPin size={64} />
                 </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                 <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Operational Area</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{incident.location}</div>
                 </div>
                 <button className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all shadow-xl">
                    <ExternalLink size={14} />
                 </button>
              </div>
           </div>

           {/* Quick Actions / Checklist */}
           <div className="glass-card p-8 space-y-6 bg-[#070707]">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Response Checklist</h3>
              <div className="space-y-4">
                 {[
                   { task: 'Verify sensor telemetry', done: true },
                   { task: 'Dispatch drone unit', done: true },
                   { task: 'Notify local authorities', done: false },
                   { task: 'Activate emergency shelter', done: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        item.done ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/10 bg-white/[0.02]'
                      }`}>
                         {item.done && <CheckCircle2 size={12} strokeWidth={3} />}
                      </div>
                      <span className={`text-xs font-medium ${item.done ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                        {item.task}
                      </span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-[0.2em] transition-all">
                 Update Checklist
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
