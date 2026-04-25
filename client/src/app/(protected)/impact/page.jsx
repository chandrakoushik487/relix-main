'use client';
import React from 'react';
import { 
  Heart, 
  Users, 
  Zap, 
  Award, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  Shield,
  Activity,
  Globe
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', impact: 400 },
  { name: 'Feb', impact: 300 },
  { name: 'Mar', impact: 600 },
  { name: 'Apr', impact: 800 },
  { name: 'May', impact: 500 },
  { name: 'Jun', impact: 900 },
];

export default function ImpactPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold font-display text-white tracking-tight">Impact Analytics</h2>
          <p className="text-zinc-500 text-sm max-w-lg">Quantifying the human, economic, and environmental change driven by our network.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Global Reach</div>
              <div className="flex items-center gap-2">
                 <Globe size={14} className="text-emerald-400" />
                 <span className="text-lg font-bold text-white tracking-tight">142 Regions</span>
              </div>
           </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Lives Impacted', value: '1.2M+', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/5' },
          { label: 'Volunteers Active', value: '42.5K', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
          { label: 'Resource Efficiency', value: '94%', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/5' },
          { label: 'Safety Index', value: '9.8/10', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-400/5' },
        ].map((kpi, i) => (
          <div key={i} className={`glass-card p-8 space-y-6 bg-[#070707] group hover:scale-[1.02] transition-all`}>
            <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center ${kpi.color} group-hover:scale-110 transition-all`}>
              <kpi.icon size={24} />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white tracking-tighter">{kpi.value}</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trends & Recognition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-10 bg-[#070707] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <TrendingUp size={16} className="text-indigo-500" />
              Net Impact Trajectory
            </h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-indigo-500" />
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Units / Month</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#52525b', fontSize: 10, fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#52525b', fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impact" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorImpact)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recognition / Badges Sidebar */}
        <div className="glass-card p-10 bg-[#070707] space-y-10">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <Award size={16} className="text-amber-500" />
              Achievements
            </h3>
            <p className="text-[10px] text-zinc-600 font-medium tracking-wider">Top recognition for mission success.</p>
          </div>

          <div className="space-y-6">
            {[
              { title: 'Global Protector', date: 'Oct 2025', desc: '50+ International missions', icon: Shield, color: 'text-indigo-400' },
              { title: 'Rapid Responder', date: 'Dec 2025', desc: 'Sub-30m response time', icon: Activity, color: 'text-emerald-400' },
              { title: 'Unit Mentor', date: 'Jan 2026', desc: 'Trained 100+ responders', icon: Users, color: 'text-amber-400' },
            ].map((badge, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all ${badge.color}`}>
                  <badge.icon size={24} />
                </div>
                <div className="space-y-1 pt-1">
                  <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{badge.title}</div>
                  <div className="text-[10px] text-zinc-500 leading-tight">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-[10px] font-bold text-zinc-600 hover:text-white hover:border-white/10 hover:bg-white/[0.01] transition-all uppercase tracking-widest flex items-center justify-center gap-3 group">
             <Calendar size={14} className="group-hover:text-indigo-400 transition-colors" />
             View Full Milestone Map
          </button>
        </div>
      </div>
    </div>
  );
}
