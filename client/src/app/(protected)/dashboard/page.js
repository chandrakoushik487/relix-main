'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useChartData } from '@/lib/useChartData';
import { 
  AlertTriangle, 
  Users, 
  Activity, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  MoreVertical,
  Zap,
  BarChart3,
  TrendingUp,
  Shield,
  Download,
  Plus,
  Search
} from 'lucide-react';

// Dynamic imports for charts
const IssuesByTypeChart = dynamic(() => import('@/components/charts/IssuesByTypeChart'), { ssr: false });
const IssuesOverTimeChart = dynamic(() => import('@/components/charts/IssuesOverTimeChart'), { ssr: false });
const StatusDonutChart = dynamic(() => import('@/components/charts/StatusDonutChart'), { ssr: false });
const AnimatedCounter = dynamic(() => import('@/components/charts/AnimatedCounter'), { ssr: false });
import AssignUnitModal from '@/components/modals/AssignUnitModal';

const StatCard = ({ label, value, trend, subtext, isCritical = false }) => (
  <div className={`glass-card p-6 group transition-all hover:border-white/10 ${isCritical ? 'border-red-500/30 bg-red-500/5' : ''}`}>
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
      <div className="text-3xl font-bold text-white tabular-nums">
        <AnimatedCounter value={value} />
      </div>
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
  </div>
);

export default function Dashboard() {
  const { chartData, metrics, loading, isLive, refetch } = useChartData();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {isAssignModalOpen && <AssignUnitModal onClose={() => setAssignModalOpen(false)} />}
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {isLive ? 'Live Intelligence' : 'Mock Simulation'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white">Operations Dashboard</h2>
          <p className="text-zinc-500 text-sm mt-1">Global command center and real-time incident monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={refetch}
            className="bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <Activity size={14} />
            Refresh
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-2">
            <Download size={14} />
            Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/5">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'analytics', label: 'Advanced Analytics', icon: BarChart3 },
          { id: 'resources', label: 'Resources', icon: Shield }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              label="Total Reports" 
              value={metrics.total_reports || 0} 
              trend="+12.4%" 
              subtext="Last 7 days" 
            />
            <StatCard 
              label="Critical Incidents" 
              value={metrics.critical_issues || 0} 
              trend="-2" 
              subtext="Immediate response required" 
              isCritical={true}
            />
            <StatCard 
              label="People Affected" 
              value={metrics.total_affected || 0} 
              trend="+8.2%"
              subtext="Estimated impact" 
            />
            <StatCard 
              label="Active Volunteers" 
              value={metrics.active_volunteers || 0} 
              subtext="Across active zones" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tactical Map & Analytics */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tactical Map Mockup */}
              <div className="glass-card h-[400px] relative overflow-hidden group border-white/5">
                <div className="absolute inset-0 bg-[#050505]">
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
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 pointer-events-auto">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Zone Alert: Sector 7</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-medium">
                        High Water Levels · 4 Active Reports
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-6 py-2.5 rounded-full text-xs font-bold transition-all pointer-events-auto flex items-center gap-2">
                      <MapPin size={14} />
                      Open Full Map
                    </button>
                  </div>
                </div>
                {/* Pins */}
                <div className="absolute top-[40%] left-[30%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce"></div>
                <div className="absolute top-[60%] left-[55%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 border-white/5">
                  <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                    <Activity size={16} className="text-indigo-400" />
                    Issue Composition
                  </h3>
                  {!loading && <IssuesByTypeChart data={chartData.issuesByType} hideHeader />}
                </div>
                <div className="glass-card p-6 border-white/5">
                  <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={16} className="text-indigo-400" />
                    Trend Analysis
                  </h3>
                  {!loading && <IssuesOverTimeChart data={chartData.issuesOverTime} hideHeader />}
                </div>
              </div>
            </div>

            {/* Right Column - Incident Feed & Distribution */}
            <div className="space-y-8">
              <div className="glass-card flex flex-col h-[520px] border-white/5">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">Live Feed</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-500">Live</span>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  <IncidentItem 
                    severity="Critical" 
                    title="Severe Flooding - Sector A" 
                    location="Hyderabad East" 
                    time="2m ago" 
                  />
                  <IncidentItem 
                    severity="High" 
                    title="Resource Shortage" 
                    location="Central Camp" 
                    time="15m ago" 
                  />
                  <IncidentItem 
                    severity="Stable" 
                    title="Volunteer Unit Arrived" 
                    location="Zone 4" 
                    time="28m ago" 
                  />
                  <IncidentItem 
                    severity="High" 
                    title="Power Outage Detected" 
                    location="Medical Center" 
                    time="42m ago" 
                  />
                  <IncidentItem 
                    severity="Critical" 
                    title="Bridge Obstruction" 
                    location="River Delta" 
                    time="1h ago" 
                  />
                </div>
                <button className="p-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors border-t border-white/5 bg-white/[0.01]">
                  View Incident Explorer
                </button>
              </div>

              <div className="glass-card p-6 border-white/5">
                <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
                  <Users size={16} className="text-indigo-400" />
                  Status Distribution
                </h3>
                {!loading && <StatusDonutChart data={chartData.statusDistribution} hideHeader />}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6 border-white/5 h-[400px]">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Historical Trend</h3>
                <IssuesOverTimeChart data={chartData.issuesOverTime} hideHeader />
              </div>
              <div className="glass-card p-6 border-white/5 h-[400px]">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Issue Breakdown</h3>
                <IssuesByTypeChart data={chartData.issuesByType} hideHeader />
              </div>
           </div>
           <div className="glass-card p-12 flex flex-col items-center justify-center text-center border-white/5">
              <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mb-6 text-indigo-400">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Predictive Analysis</h3>
              <p className="text-zinc-500 max-w-md mx-auto text-sm">
                Advanced machine learning models are analyzing patterns to predict potential escalation zones.
              </p>
           </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center border-white/5">
          <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center mb-6 text-emerald-400">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Resource Management</h3>
          <p className="text-zinc-500 max-w-md mx-auto text-sm mb-8">
            Monitor and assign units, manage inventory, and coordinate field logistics.
          </p>
          <button 
            onClick={() => setAssignModalOpen(true)}
            className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Assign New Unit
          </button>
        </div>
      )}
    </div>
  );
}
