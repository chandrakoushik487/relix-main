import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  AlertTriangle, 
  Users, 
  Activity, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  MoreVertical,
  Zap
} from 'lucide-react';
import './relix_v2.css';

const StatCard = ({ label, value, trend, subtext, isCritical = false }) => (
  <div className={`glass-card p-6 ${isCritical ? 'border-red-500/30 bg-red-500/5' : ''}`}>
    <div className="flex justify-between items-start mb-4">
      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold font-display text-white">{value}</span>
    </div>
    <p className="text-[11px] text-zinc-500 mt-2 font-medium">{subtext}</p>
  </div>
);

const IncidentItem = ({ type, title, location, time, severity }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
      severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
      severity === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    }`}>
      {severity === 'Critical' ? <AlertTriangle size={18} /> : severity === 'High' ? <Clock size={18} /> : <Zap size={18} />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-bold text-white truncate">{title}</h4>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
          severity === 'Critical' ? 'text-red-400 border-red-500/20' : 
          severity === 'High' ? 'text-amber-400 border-amber-500/20' : 
          'text-emerald-400 border-emerald-500/20'
        }`}>
          {severity}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
        <span className="flex items-center gap-1"><MapPin size={12} /> {location}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {time}</span>
      </div>
    </div>
    <button className="text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <MoreVertical size={16} />
    </button>
  </div>
);

const NGODashboardV2 = () => {
  return (
    <LayoutWrapper activeTab="Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold font-display text-white mb-2">Operations Overview</h2>
            <p className="text-zinc-500 text-sm">Real-time command center for Secunderabad region.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">
              Export Report
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">
              Live Feed
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Total Reports" 
            value="1,482" 
            trend="+12.4%" 
            subtext="Last 24 hours" 
          />
          <StatCard 
            label="Critical Incidents" 
            value="14" 
            trend="-2" 
            subtext="Immediate response required" 
            isCritical={true}
          />
          <StatCard 
            label="Active Volunteers" 
            value="312" 
            subtext="Across 5 active zones" 
          />
          <StatCard 
            label="Resolution Rate" 
            value="89%" 
            trend="+2.1%" 
            subtext="Avg. time: 42 mins" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card h-[400px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#050505]">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(#6366F1 1px, transparent 0)', 
                  backgroundSize: '30px 30px' 
                }}></div>
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  <path d="M100,100 L300,150 L500,100 L700,200" fill="none" stroke="#6366F1" strokeWidth="2" />
                  <path d="M50,300 L250,350 L450,300" fill="none" stroke="#6366F1" strokeWidth="2" />
                </svg>
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="bg-black/60 backdrop-blur-md border border-white/5 rounded-xl p-3 pointer-events-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Active Zone: District 9</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      3 Critical · 12 High · 8 Volunteers
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pointer-events-auto">
                    <button className="w-8 h-8 bg-black/60 backdrop-blur-md border border-white/5 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Plus size={16} />
                    </button>
                    <button className="w-8 h-8 bg-black/60 backdrop-blur-md border border-white/5 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full text-xs font-bold transition-all shadow-lg pointer-events-auto flex items-center gap-2">
                    <MapPin size={14} />
                    Expand Tactical Map
                  </button>
                </div>
              </div>

              {/* Pins */}
              <div className="absolute top-[40%] left-[30%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce pointer-events-none"></div>
              <div className="absolute top-[60%] left-[55%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(245,158,11,0.5)] pointer-events-none"></div>
              <div className="absolute top-[25%] left-[70%] w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(99,102,241,0.5)] pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-white mb-6 font-display flex items-center gap-2">
                  <Activity size={16} className="text-indigo-400" />
                  Issue Distribution
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Medical', value: 42, color: '#6366F1' },
                    { label: 'Food/Water', value: 28, color: '#10B981' },
                    { label: 'Shelter', value: 18, color: '#F59E0B' },
                    { label: 'Other', value: 12, color: '#71717A' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-zinc-400 uppercase tracking-wider">{item.label}</span>
                        <span className="text-white">{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-white mb-6 font-display flex items-center gap-2">
                  <Clock size={16} className="text-indigo-400" />
                  Response Times
                </h3>
                <div className="h-40 flex items-end justify-between gap-2 px-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-sm relative group cursor-pointer hover:bg-indigo-600/40 transition-colors" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}m
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Feed */}
          <div className="glass-card flex flex-col h-full">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-display">Live Incident Feed</h3>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <IncidentItem 
                severity="Critical" 
                title="Severe Flooding - Zone 4" 
                location="District 9 North" 
                time="2m ago" 
              />
              <IncidentItem 
                severity="High" 
                title="Medical Supply Shortage" 
                location="Central Shelter" 
                time="14m ago" 
              />
              <IncidentItem 
                severity="Stable" 
                title="Volunteer Team Assigned" 
                location="Kukatpally" 
                time="28m ago" 
              />
              <IncidentItem 
                severity="High" 
                title="Structural Damage Alert" 
                location="Old Town Sector" 
                time="1h ago" 
              />
              <IncidentItem 
                severity="Critical" 
                title="Bridge Collapse Reported" 
                location="River Crossing B" 
                time="2h ago" 
              />
              <IncidentItem 
                severity="Stable" 
                title="Water Tanker Delivered" 
                location="Zone 2 Camp" 
                time="4h ago" 
              />
            </div>
            <button className="p-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors border-t border-white/5 bg-white/[0.01]">
              View All Incidents
            </button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

const Minus = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>;

export default NGODashboardV2;
