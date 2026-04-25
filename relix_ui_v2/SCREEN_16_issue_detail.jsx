import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  ArrowLeft, 
  MapPin, 
  AlertTriangle, 
  Users, 
  MessageSquare, 
  History, 
  CheckCircle2, 
  Share2, 
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Activity
} from 'lucide-react';
import './relix_v2.css';

const IssueDetailV2 = () => {
  return (
    <LayoutWrapper activeTab="Explorer">
      <div className="space-y-8 py-2">
        {/* Back & Actions */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Explorer</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
              <MoreVertical size={18} />
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              Assign Response Team
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="glass-panel p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">Critical Severity</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Reported 14m ago by Satellite AI</span>
                  </div>
                  <h1 className="text-4xl font-bold font-display text-white">Severe Water Contamination</h1>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <MapPin size={16} className="text-indigo-400" />
                    <span className="text-sm font-medium italic">33°51'21.1"N 118°14'34.2"W • District 9, Sector 4C</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Issue ID</span>
                  <span className="text-xl font-mono font-bold text-indigo-400">ISS-4821</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Full Description</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Automated sensors in District 9 have detected a spike in toxic particulate matter entering the main reservoir. Primary intake systems are failing to filter the contaminants. High risk of community exposure if not addressed within 6 hours.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { label: 'Problem Type', value: 'Environmental / Health', icon: Activity },
                  { label: 'SVI Score', value: '0.89 (High)', icon: ShieldCheck },
                  { label: 'Population Affected', value: '4,200 approx.', icon: Users },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
                    <stat.icon size={16} className="text-indigo-400" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{stat.label}</span>
                      <span className="text-sm font-bold text-white">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Timeline */}
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Incident Timeline</h3>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                {[
                  { time: '14m ago', title: 'Incident Logged', desc: 'Satellite AI detected discoloration in reservoir intake.', status: 'completed' },
                  { time: '10m ago', title: 'Staff Alerted', desc: 'Emergency response teams notified via Relix App.', status: 'completed' },
                  { time: '2m ago', title: 'Initial Assessment', desc: 'Drone #4 dispatched for visual confirmation.', status: 'current' },
                  { time: 'Scheduled', title: 'Containment Deployment', desc: 'Awaiting team acceptance for onsite deployment.', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 space-y-1">
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 ${
                      item.status === 'completed' ? 'bg-indigo-500 border-indigo-500' : 
                      item.status === 'current' ? 'bg-[#030303] border-indigo-500 animate-pulse' : 
                      'bg-[#030303] border-white/10'
                    } flex items-center justify-center z-10`}>
                      {item.status === 'completed' && <CheckCircle2 size={12} className="text-white" />}
                      {item.status === 'current' && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${item.status === 'pending' ? 'text-zinc-600' : 'text-white'}`}>{item.title}</h4>
                      <span className="text-[10px] font-bold text-zinc-500">{item.time}</span>
                    </div>
                    <p className={`text-xs ${item.status === 'pending' ? 'text-zinc-700' : 'text-zinc-500'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
             {/* Map Card */}
             <div className="glass-panel p-2 h-64 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#080808]" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-8 h-8 bg-red-500 rounded-full animate-ping opacity-20" />
                   <div className="w-4 h-4 bg-red-500 rounded-full absolute top-2 left-2 border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Area View</span>
                  <ExternalLink size={14} className="text-zinc-500" />
                </div>
             </div>

             {/* Assigned Team */}
             <div className="glass-panel p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Response Team</h3>
                  <button className="text-[10px] font-bold text-indigo-400 hover:underline transition-all">MANAGE</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', role: 'Lead Medic', status: 'En Route' },
                    { name: 'Marcus Wright', role: 'Logistics', status: 'Pending' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{member.name}</p>
                          <p className="text-[10px] text-zinc-500">{member.role}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${member.status === 'En Route' ? 'text-indigo-400 bg-indigo-500/10' : 'text-zinc-500 bg-white/5'}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-white/5 hover:border-white/10 rounded-xl text-[10px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-widest">
                    + Add Responder
                  </button>
                </div>
             </div>

             {/* AI Analysis */}
             <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-indigo-400">
                  <Activity size={20} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Relix AI Prediction</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Based on historical District 9 data, this contamination event has an 82% probability of spreading to Sector 4D if containment fails.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase mb-2">
                    <span>Risk Projection</span>
                    <span className="text-red-400 italic">High Hazard</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full">
                    <div className="h-full bg-red-500 w-[82%]" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default IssueDetailV2;
