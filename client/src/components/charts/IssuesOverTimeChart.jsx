'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 min-w-[160px]">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-slate-300 capitalize">
              {entry.dataKey === 'created' ? 'New' : entry.dataKey === 'resolved' ? 'Resolved' : '7d Avg'}
            </span>
          </div>
          <span className="text-sm font-bold tabular-nums">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function IssuesOverTimeChart({ data }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Issues Over Time</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">New vs Resolved — last 14 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-semibold text-slate-500">New</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-slate-500">Resolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-0.5 border-t-2 border-dashed border-amber-400" />
            <span className="text-[10px] font-semibold text-slate-500">7d Avg</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontWeight: 500, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 500, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="created"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#gradCreated)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3B82F6' }}
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#10B981"
            strokeWidth={2.5}
            fill="url(#gradResolved)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#10B981' }}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="avg7d"
            stroke="#F59E0B"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
