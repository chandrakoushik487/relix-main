'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = {
  Water: '#3B82F6',
  Health: '#EF4444',
  Housing: '#F59E0B',
  Education: '#8B5CF6',
  Others: '#F97316',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const total = item.payload._total || 1;
  const pct = ((item.value / total) * 100).toFixed(1);
  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-extrabold tabular-nums">{item.value} <span className="text-xs font-medium text-slate-400">issues</span></p>
      <p className="text-[11px] text-slate-500 mt-0.5">{pct}% of total</p>
    </div>
  );
};

export default function IssuesByTypeChart({ data }) {
  // Enrich data with total for percentage calculation in tooltip
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const enriched = data.map(d => ({ ...d, _total: total }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Issues by Category</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Distribution across problem types</p>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md tabular-nums">
          {total} total
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={enriched} barCategoryGap="20%" margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="type"
            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 500, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
            {enriched.map((entry) => (
              <Cell key={entry.type} fill={COLORS[entry.type] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 pt-4 border-t border-slate-100">
        {data.map(d => (
          <div key={d.type} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[d.type] }} />
            <span className="text-[10px] font-semibold text-slate-500">{d.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
