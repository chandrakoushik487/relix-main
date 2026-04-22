'use client';
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useChartData } from '@/lib/useChartData';
import { getResponseTimeTrend } from '@/components/charts/mockChartData';

// Dynamic imports to avoid SSR hydration issues with Recharts
const IssuesByTypeChart = dynamic(() => import('@/components/charts/IssuesByTypeChart'), { ssr: false });
const IssuesOverTimeChart = dynamic(() => import('@/components/charts/IssuesOverTimeChart'), { ssr: false });
const StatusDonutChart = dynamic(() => import('@/components/charts/StatusDonutChart'), { ssr: false });
const SviHeatmapChart = dynamic(() => import('@/components/charts/SviHeatmapChart'), { ssr: false });
const ResponseTimeChart = dynamic(() => import('@/components/charts/ResponseTimeChart'), { ssr: false });
const AnimatedCounter = dynamic(() => import('@/components/charts/AnimatedCounter'), { ssr: false });
import AssignUnitModal from '@/components/modals/AssignUnitModal';

// --- Icons ---
const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconMap = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
const IconFeed = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const IconBell = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const IconSearch = () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconChart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconRefresh = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

// ─────────────────────────────────── Layout Components ───────────────────────────

const TopNav = ({ isLive }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
    <div className="flex items-center gap-8">
      <h1 className="text-xl font-extrabold tracking-tight text-slate-900">RELIX</h1>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
        <a href="#" className="text-slate-900 border-b-2 border-slate-900 py-5">Dashboard</a>
        <a href="#" className="hover:text-slate-900 transition-colors py-5">Emergency Map</a>
        <a href="#" className="hover:text-slate-900 transition-colors py-5">Data Lake</a>
      </nav>
    </div>
    <div className="flex items-center gap-6">
      {/* Live/Mock indicator */}
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {isLive ? 'Live' : 'Mock Data'}
        </span>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch />
        </div>
        <input 
          type="text" 
          placeholder="Search incidents..." 
          className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 w-64"
        />
      </div>
      <button className="text-slate-500 hover:text-slate-900 relative">
        <IconBell />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shrink-0"></div>
    </div>
  </header>
);

const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="w-64 flex-shrink-0 bg-[#f7f9fb] border-r border-slate-200 flex flex-col justify-between py-6 h-[calc(100vh-64px)] overflow-y-auto">
    <div className="px-6 space-y-6">
      <div>
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Intelligence</p>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === 'overview'
                ? 'font-semibold text-slate-900 bg-white border border-slate-200 shadow-sm'
                : 'font-medium text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <IconDashboard /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === 'analytics'
                ? 'font-semibold text-slate-900 bg-white border border-slate-200 shadow-sm'
                : 'font-medium text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <IconChart /> Analytics
          </button>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-white/50 rounded-lg transition-colors">
            <IconMap /> Map View
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-white/50 rounded-lg transition-colors">
            <IconFeed /> Incident Feed
          </a>
        </nav>
      </div>
    </div>

    <div className="px-6 space-y-4">
      <div>
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Filters</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Region</label>
            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-slate-300">
              <option>All Regions</option>
              <option>Secunderabad</option>
              <option>Kukatpally</option>
              <option>Medchal</option>
              <option>LB Nagar</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Severity</label>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:scale-125 transition-transform ring-2 ring-transparent hover:ring-red-200"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500 cursor-pointer hover:scale-125 transition-transform ring-2 ring-transparent hover:ring-amber-200"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 cursor-pointer hover:scale-125 transition-transform ring-2 ring-transparent hover:ring-emerald-200"></div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-all hover:bg-slate-900 hover:shadow-md active:scale-[0.98]">
        Create Ticket
      </button>
    </div>
  </aside>
);

// ─────────────────────────────────── Metric Card ──────────────────────────────────

const MetricCard = ({ label, value, subtext, highlight, trend }) => {
  const formattedValue = typeof value === 'number'
    ? (value >= 1000 ? (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : value.toLocaleString())
    : value;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group ${highlight === 'red' ? 'border-l-4 border-l-red-500' : ''}`}>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <AnimatedCounter value={formattedValue} className="text-3xl font-extrabold text-slate-900 tabular-nums" />
        {trend && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-transform group-hover:scale-105 ${
            trend.startsWith('+') ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
          }`}>
            {trend}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs font-medium text-slate-400 mt-1">{subtext}</p>}
    </div>
  );
};

// ─────────────────────────────────── Skeleton Loader ─────────────────────────────

const ChartSkeleton = ({ height = 260 }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-pulse">
    <div className="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
    <div className="h-2 bg-slate-100 rounded w-1/2 mb-5"></div>
    <div className="rounded-lg bg-slate-50" style={{ height }}></div>
  </div>
);

// ─────────────────────────────────── Overview Tab ───────────────────────────────

const OverviewTab = ({ metrics, chartData, loading }) => {
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);
  return (
  <>
    {isAssignModalOpen && <AssignUnitModal onClose={() => setAssignModalOpen(false)} />}
    {/* Top Metrics Row */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <MetricCard label="Total Reports" value={metrics.total_reports} trend="+12%" subtext="Last 7 days" />
      <MetricCard label="Critical Issues" value={metrics.critical_issues} highlight="red" subtext="Immediate action required" />
      <MetricCard label="People Affected" value={metrics.total_affected} trend="+8%" subtext="Est. impacted population" />
      <MetricCard label="Active Volunteers" value={metrics.active_volunteers} subtext="12 units en route" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column (Map & Feed) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Map Placeholder */}
        <div className="bg-slate-200 rounded-xl relative overflow-hidden h-[300px] flex items-center justify-center border border-slate-300 shadow-inner">
          <div className="absolute inset-0 bg-slate-300" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 0)', backgroundSize: '20px 20px', opacity: 0.3 }} />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
          <span className="relative z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
            Interactive Map Region
          </span>
          <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
          <div className="absolute top-[60%] left-[50%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-sm" />
          <div className="absolute top-[30%] left-[70%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
        </div>

        {/* Incident Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Incident Feed</h3>
            <a href="#" className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md px-2 py-1 transition-colors">View Full Log</a>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">🚨</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Severe Flooding - District 9</h4>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider">Critical</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">Water levels reached +2.4m. Evacuation teams deployed to primary coordinates.</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>🕒 4 mins ago · 👤 Reported by Ops-Delta</span>
                  <a href="#" className="font-semibold text-slate-900 hover:underline">Details →</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">📦</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Medical Resupply Successful</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">Stable</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">Resource Drop Point D has received the critical medical kits. Distribution started.</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>🕒 14 mins ago · 👤 Reported by Logi-Unit 2</span>
                  <a href="#" className="font-semibold text-slate-900 hover:underline">Details →</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">⚠️</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Shelter Capacity Warning — Zone B</h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider">High</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">Zone B refugee shelter at 94% capacity. Overflow plan activation recommended.</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>🕒 28 mins ago · 👤 Reported by Shelter-Ops</span>
                  <a href="#" className="font-semibold text-slate-900 hover:underline">Details →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Charts Section (matches spec: "Charts Section (Bar + Line)") */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <>
              <ChartSkeleton height={220} />
              <ChartSkeleton height={220} />
            </>
          ) : (
            <>
              <IssuesByTypeChart data={chartData.issuesByType} />
              <IssuesOverTimeChart data={chartData.issuesOverTime} />
            </>
          )}
        </div>
      </div>

      {/* Right Column (Insights & Volunteers) */}
      <div className="space-y-6">
        {/* AI Intelligence Card */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-700 opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-600 opacity-10 rounded-full blur-2xl"></div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            AI Intelligence
          </h3>
          <p className="text-lg font-medium text-white leading-snug mb-6">
            &ldquo;Based on current water rise, District 4 will be inaccessible in 12 hours. Redirect Logi-Units now.&rdquo;
          </p>
          <div className="flex gap-2">
            <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all border border-white/10 hover:border-white/20">
              Execute Redirection
            </button>
            <button className="bg-transparent text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all">
              Dismiss
            </button>
          </div>
        </div>

        {/* Status Donut — inline preview */}
        {!loading && <StatusDonutChart data={chartData.statusDistribution} />}
        {loading && <ChartSkeleton height={200} />}

        {/* Volunteer Status / Resource Levels */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Volunteer Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">MC</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Marcus Chen</p>
                    <p className="text-[10px] font-medium text-slate-500">Unit: Rapid Rescue 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-semibold text-emerald-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">ER</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Elena Rodriguez</p>
                    <p className="text-[10px] font-medium text-slate-500">Unit: Med/Doc Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-semibold text-emerald-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">AK</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Ananya Kumar</p>
                    <p className="text-[10px] font-medium text-slate-500">Unit: Logistics Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="text-[9px] font-semibold text-amber-600">Busy</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setAssignModalOpen(true)}
              className="w-full mt-4 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 py-2 rounded-lg hover:bg-slate-100 transition-colors active:scale-[0.98]"
            >
              Assign New Unit
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Supply Levels</h3>
            <div className="space-y-4 text-xs">
              {[
                { label: 'Potable Water', pct: 82, color: 'emerald' },
                { label: 'Medical Kits', pct: 14, color: 'red' },
                { label: 'Shelter Units', pct: 51, color: 'amber' },
                { label: 'Ration Packs', pct: 67, color: 'blue' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-700">{item.label}</span>
                    <span className={`text-${item.color}-${item.pct < 30 ? '500' : '600'}`}>{item.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

// ─────────────────────────────────── Analytics Tab ───────────────────────────────

const AnalyticsTab = ({ chartData, loading, isLive, onRefresh }) => {
  const responseTimeData = useMemo(() => getResponseTimeTrend(), []);

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Analytics & Insights</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time operational intelligence across all active zones</p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors active:scale-[0.97]"
        >
          <IconRefresh />
          Refresh Data
        </button>
      </div>

      {/* Row 1: Two main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {loading ? (
          <>
            <ChartSkeleton height={260} />
            <ChartSkeleton height={260} />
          </>
        ) : (
          <>
            <IssuesByTypeChart data={chartData.issuesByType} />
            <IssuesOverTimeChart data={chartData.issuesOverTime} />
          </>
        )}
      </div>

      {/* Row 2: Donut + SVI + Response Time */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {loading ? (
          <>
            <ChartSkeleton height={200} />
            <div className="lg:col-span-2"><ChartSkeleton height={220} /></div>
          </>
        ) : (
          <>
            <StatusDonutChart data={chartData.statusDistribution} />
            <div className="lg:col-span-2">
              <SviHeatmapChart data={chartData.sviByRegion} />
            </div>
          </>
        )}
      </div>

      {/* Row 3: Response Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <ChartSkeleton height={200} />
        ) : (
          <ResponseTimeChart data={responseTimeData} />
        )}
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500 opacity-[0.07] rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Operations Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Avg Response Time</span>
                <span className="text-sm font-extrabold text-white tabular-nums">23 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Resolution Rate</span>
                <span className="text-sm font-extrabold text-emerald-400 tabular-nums">59%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Volunteer Utilization</span>
                <span className="text-sm font-extrabold text-blue-400 tabular-nums">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">SVI Critical Zones</span>
                <span className="text-sm font-extrabold text-red-400 tabular-nums">2</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-6">Auto-refreshes every 30 seconds · Last updated just now</p>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────── Main Dashboard ─────────────────────────────────

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { chartData, metrics, loading, isLive, refetch } = useChartData();

  return (
    <div className="p-8">
      {/* 
        Temporary Tab Selector (Since TopNav/Sidebar were moved to Layout and no longer manage this state).
        In a full refactor, /analytics would be a separate route page.
        For now, we let people click here or rely on the fact that Dashboard provides overview.
      */}
      <div className="mb-6 flex gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`text-sm font-semibold pb-2 border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`text-sm font-semibold pb-2 border-b-2 ${activeTab === 'analytics' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'overview' && (
        <OverviewTab metrics={metrics} chartData={chartData} loading={loading} />
      )}
      {activeTab === 'analytics' && (
        <AnalyticsTab
          chartData={chartData}
          loading={loading}
          isLive={isLive}
          onRefresh={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
