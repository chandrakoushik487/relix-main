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

const getSviColor = (score) => {
  if (score >= 7.0) return '#EF4444';  // Critical
  if (score >= 4.0) return '#F97316';  // High
  if (score >= 2.0) return '#EAB308';  // Medium
  return '#22C55E';                     // Low
};

const getSviTier = (score) => {
  if (score >= 7.0) return 'Critical';
  if (score >= 4.0) return 'High';
  if (score >= 2.0) return 'Medium';
  return 'Low';
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const tier = getSviTier(item.svi);
  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{item.region}</p>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSviColor(item.svi) }} />
        <span className="text-sm font-extrabold tabular-nums">{item.svi.toFixed(1)}</span>
        <span className="text-[10px] font-medium text-slate-400 uppercase">{tier}</span>
      </div>
      <p className="text-[11px] text-slate-500">{item.issues} active issues</p>
    </div>
  );
};

export default function SviHeatmapChart({ data }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">SVI by Region</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Social Vulnerability Index — hotspot severity</p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: 'Critical', color: '#EF4444' },
            { label: 'High', color: '#F97316' },
            { label: 'Medium', color: '#EAB308' },
            { label: 'Low', color: '#22C55E' },
          ].map(t => (
            <div key={t.label} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-[9px] font-semibold text-slate-400">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 10]}
            tick={{ fontSize: 10, fontWeight: 500, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="region"
            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.06)' }} />
          <Bar dataKey="svi" radius={[0, 6, 6, 0]} animationDuration={800} barSize={18}>
            {data.map((entry) => (
              <Cell key={entry.region} fill={getSviColor(entry.svi)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
