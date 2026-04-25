import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Brain, 
  Target, 
  Zap, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import './relix_v2.css';

const InsightCard = ({ title, content, type }) => (
  <div className={`glass-card p-6 border-l-4 ${
    type === 'action' ? 'border-indigo-500' : 
    type === 'warning' ? 'border-amber-500' : 
    'border-emerald-500'
  }`}>
    <div className="flex items-center gap-2 mb-3">
      {type === 'action' ? <Brain size={16} className="text-indigo-400" /> : 
       type === 'warning' ? <AlertCircle size={16} className="text-amber-400" /> : 
       <Target size={16} className="text-emerald-400" />}
      <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">{title}</h4>
    </div>
    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{content}</p>
    <button className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-1 group">
      See Detailed Analysis <Zap size={12} className="group-hover:translate-x-0.5 transition-transform" />
    </button>
  </div>
);

const AnalyticsInsightsV2 = () => {
  return (
    <LayoutWrapper activeTab="Analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold font-display text-white mb-2">Operational Analytics</h2>
            <p className="text-zinc-500 text-sm">Advanced data intelligence and AI-driven mission insights.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-zinc-900 border border-white/5 text-zinc-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
              <Calendar size={14} /> Last 30 Days
            </button>
            <button className="bg-zinc-900 border border-white/5 text-zinc-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
              <Filter size={14} /> Filters
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
              <Download size={14} /> Export Intelligence
            </button>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard 
            title="Strategic Recommendation"
            content="Based on current water level trends, District 9 bridge will become inaccessible within 14 hours. We recommend pre-deploying supply units to the northern sector immediately."
            type="action"
          />
          <InsightCard 
            title="Capacity Alert"
            content="Primary medical center at Zone B is operating at 94% capacity. Current casualty inflow suggests saturation in 3 hours. Divert secondary cases to Field Hospital 2."
            type="warning"
          />
          <InsightCard 
            title="Performance Milestone"
            content="Response times have decreased by 22% since the activation of the automated volunteer matching engine. Efficiency in District 4 is at an all-time high."
            type="success"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Incident Volume Trends</h3>
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">Aggregated Daily Reports</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> This Month</div>
                <div className="flex items-center gap-2 text-zinc-600"><span className="w-2 h-2 bg-zinc-700 rounded-full"></span> Last Month</div>
              </div>
            </div>
            <div className="h-[280px] flex items-end gap-1 px-4">
              {[20, 35, 25, 45, 60, 40, 55, 75, 45, 30, 50, 85, 65, 40, 55, 70, 95, 80, 60, 40, 30, 50, 70, 90, 100, 80, 60, 40, 30, 20].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-sm hover:bg-indigo-600 transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-t border-white/5 pt-4">
              <span>Day 01</span>
              <span>Day 10</span>
              <span>Day 20</span>
              <span>Day 30</span>
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Volunteer Efficiency</h3>
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">Resolution Time by Region</p>
              </div>
              <TrendingUp size={20} className="text-emerald-400" />
            </div>
            <div className="space-y-8">
              {[
                { region: 'District 9', time: '28m', pct: 92, status: 'Optimal' },
                { region: 'Kukatpally', time: '42m', pct: 75, status: 'Above Avg' },
                { region: 'Medchal', time: '55m', pct: 60, status: 'Average' },
                { region: 'LB Nagar', time: '84m', pct: 35, status: 'Delayed' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <span className="text-[11px] font-bold text-white uppercase tracking-widest">{item.region}</span>
                      <span className="text-[10px] text-zinc-500 ml-3">{item.status}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{item.time}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.pct > 80 ? 'bg-emerald-500' : item.pct > 50 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`} 
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'SVI High-Risk Coverage', value: '82%', trend: '+4%', icon: AlertCircle },
            { label: 'Data Accuracy (OCR)', value: '98.2%', trend: '+0.5%', icon: Zap },
            { label: 'Avg Unit Proximity', value: '1.4km', trend: '-200m', icon: MapPin },
            { label: 'System Uptime', value: '99.99%', trend: 'Stable', icon: Shield }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400">
                  <stat.icon size={16} />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] font-bold text-emerald-400">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
};

const Shield = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>;
const MapPin = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;

export default AnalyticsInsightsV2;
