'use client';
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Brain, 
  Target, 
  Zap, 
  Calendar,
  Filter,
  Download,
  Shield,
  MapPin,
  ChevronRight,
  Activity,
  Maximize2
} from 'lucide-react';

const InsightCard = ({ title, content, type }) => (
  <div className={`glass-card p-6 border-l-4 transition-all hover:scale-[1.02] ${
    type === 'action' ? 'border-indigo-500' : 
    type === 'warning' ? 'border-amber-500' : 
    'border-emerald-500'
  }`}>
    <div className="flex items-center gap-2 mb-3">
      {type === 'action' ? <Brain size={16} className="text-indigo-400" /> : 
       type === 'warning' ? <AlertCircle size={16} className="text-amber-400" /> : 
       <Target size={16} className="text-emerald-400" />}
      <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <p className="text-sm text-zinc-400 leading-relaxed mb-6">{content}</p>
    <button className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 group">
      Execute Analysis <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-indigo-400" />
    </button>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-display text-white tracking-tight">Intelligence Hub</h2>
          <p className="text-zinc-500 text-sm max-w-lg">Advanced telemetry and AI-driven mission analysis for large-scale operations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-[#0A0A0A] border border-white/5 text-zinc-400 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-all">
            <Calendar size={14} /> Last 30 Days
          </button>
          <button className="bg-[#0A0A0A] border border-white/5 text-zinc-400 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-all">
            <Filter size={14} /> Refine Data
          </button>
          <button className="bg-white text-black px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Download size={14} /> Export Intel
          </button>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard 
          title="Strategic Recommendation"
          content="Current water level trends indicate District 9 bridges will reach critical saturation within 14 hours. Pre-deploy logistics to northern sectors."
          type="action"
        />
        <InsightCard 
          title="Capacity Alert"
          content="Primary medical center at Zone B is at 94% capacity. Saturation predicted in 3.2 hours. Rerouting incoming trauma cases to Field Hospital Alpha."
          type="warning"
        />
        <InsightCard 
          title="Operational Efficiency"
          content="Response times decreased by 22% following automated unit matching. Resource utilization in District 4 is optimized at 96%."
          type="success"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Incident Volume Chart */}
        <div className="glass-card p-8 group">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-white font-display tracking-tight">Telemetry Trends</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1.5">Aggregate Incident Volume</p>
            </div>
            <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full" /> Live Period</div>
              <div className="flex items-center gap-2 text-zinc-600"><span className="w-2 h-2 bg-zinc-800 rounded-full" /> Baseline</div>
            </div>
          </div>
          <div className="h-[300px] flex items-end gap-1.5 px-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-white/[0.03]" />)}
            </div>
            {[20, 35, 25, 45, 60, 40, 55, 75, 45, 30, 50, 85, 65, 40, 55, 70, 95, 80, 60, 40, 30, 50, 70, 90, 100, 80, 60, 40, 30, 20].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-[2px] hover:bg-indigo-500 transition-all cursor-pointer group/bar relative" style={{ height: `${h}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all shadow-2xl z-10">
                  {h}%
                </div>
                {i % 5 === 0 && h > 70 && <div className="absolute -top-1 w-full h-1 bg-indigo-400 blur-[4px] animate-pulse" />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] border-t border-white/5 pt-6">
            <span>T-30 Days</span>
            <span>T-15 Days</span>
            <span>Present</span>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-white font-display tracking-tight">Regional Latency</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1.5">Response Time vs Allocation</p>
            </div>
            <Activity size={20} className="text-indigo-400 opacity-50" />
          </div>
          <div className="space-y-10">
            {[
              { region: 'District 9', time: '28m', pct: 92, status: 'Optimal', color: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
              { region: 'Northern Sector', time: '42m', pct: 75, status: 'Stable', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' },
              { region: 'Western Zone', time: '55m', pct: 60, status: 'Observation', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' },
              { region: 'Central Hub', time: '84m', pct: 35, status: 'Congested', color: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{item.region}</span>
                    <span className="text-[10px] font-bold text-zinc-600 ml-4 uppercase tracking-widest">{item.status}</span>
                  </div>
                  <span className="text-xs font-bold text-white font-mono">{item.time}</span>
                </div>
                <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`} 
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'SVI Coverage', value: '82%', trend: '+4%', icon: Shield, trendColor: 'text-emerald-400' },
          { label: 'AI Accuracy', value: '98.2%', trend: '+0.5%', icon: Zap, trendColor: 'text-emerald-400' },
          { label: 'Avg Proximity', value: '1.4km', trend: '-200m', icon: MapPin, trendColor: 'text-emerald-400' },
          { label: 'System Uptime', value: '99.99%', trend: 'Stable', icon: Maximize2, trendColor: 'text-zinc-500' }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between group hover:border-white/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 transition-all">
                <stat.icon size={18} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white font-display">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.trendColor} uppercase tracking-widest`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
