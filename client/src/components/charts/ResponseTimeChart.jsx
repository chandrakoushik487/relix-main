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

const BUCKET_COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Response Time: {item.bucket}</p>
      <p className="text-lg font-extrabold tabular-nums">{item.count} <span className="text-xs font-medium text-slate-400">tasks</span></p>
    </div>
  );
};

export default function ResponseTimeChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const fast = data.filter(d => d.bucket === '<15m' || d.bucket === '15-30m').reduce((s, d) => s + d.count, 0);
  const pctFast = total ? Math.round((fast / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Response Times</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Time from report to volunteer assignment</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${pctFast >= 60 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          {pctFast}% under 30m
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="bucket"
            tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 500, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={800}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={BUCKET_COLORS[idx] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
