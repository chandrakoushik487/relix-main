'use client';
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const STATUS_COLORS = {
  Pending: '#F59E0B',
  Assigned: '#3B82F6',
  Completed: '#10B981',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-lg shadow-2xl border border-white/10">
      <p className="text-xs font-bold">{item.name}</p>
      <p className="text-sm font-extrabold tabular-nums">{item.value} <span className="text-[10px] font-medium text-slate-400">issues</span></p>
    </div>
  );
};

export default function StatusDonutChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const resolved = data.find(d => d.name === 'Completed')?.value || 0;
  const pctResolved = total ? Math.round((resolved / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">Resolution Status</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Current pipeline breakdown</p>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              animationDuration={800}
              animationEasing="ease-out"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{pctResolved}%</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Resolved</p>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-2 pt-3 border-t border-slate-100">
        {data.map(d => (
          <div key={d.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[d.name] }} />
            <span className="text-[10px] font-semibold text-slate-500">{d.name}</span>
            <span className="text-[10px] font-bold text-slate-700 tabular-nums">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
