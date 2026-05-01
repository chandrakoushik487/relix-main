'use client';
import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Calendar,
  Navigation,
  Phone,
  User,
  Activity,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subtext, color = 'indigo' }) => (
  <div className="glass-card p-6 border-white/5">
    <div className="flex items-center gap-2 mb-4">
      <Icon size={18} className={`text-${color}-400`} />
      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
    <p className="text-[11px] text-zinc-500 mt-2 font-medium">{subtext}</p>
  </div>
);

const TaskCard = ({ title, location, priority, status, time, taskId }) => (
  <div className="glass-card p-6 border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
          priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
          priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          {priority === 'Critical' ? <AlertTriangle size={18} /> :
           priority === 'High' ? <Clock size={18} /> :
           <Zap size={18} />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
            <MapPin size={12} />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
        status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
        status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      }`}>
        {status}
      </span>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
        <Clock size={12} />
        {time}
      </span>
      <div className="flex gap-2">
        {status === 'Pending' && (
          <>
            <button className="px-3 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-red-500/20">
              Decline
            </button>
            <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all">
              Accept
            </button>
          </>
        )}
        {status === 'In Progress' && (
          <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all flex items-center gap-1">
            <CheckCircle2 size={12} />
            Mark Complete
          </button>
        )}
        <button className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-white/10">
          <Navigation size={12} />
        </button>
      </div>
    </div>
  </div>
);

const PendingTaskCard = ({ title, location, priority, time }) => (
  <div className="glass-card p-4 border-amber-500/20 bg-amber-500/5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
          <AlertTriangle size={16} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
            <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          Decline
        </button>
        <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all">
          Accept
        </button>
      </div>
    </div>
  </div>
);

export default function VolunteerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {isAvailable ? 'Available for Tasks' : 'Currently Offline'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white">My Dashboard</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage your tasks and track your impact.</p>
        </div>
        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-white/20"
        >
          {isAvailable ? (
            <>
              <ToggleRight size={18} className="text-emerald-400" />
              <span className="text-emerald-400">Available</span>
            </>
          ) : (
            <>
              <ToggleLeft size={18} className="text-zinc-500" />
              <span className="text-zinc-500">Offline</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle2} label="Tasks Completed" value="12" subtext="Last 7 days" color="emerald" />
        <StatCard icon={Clock} label="Hours Logged" value="36.5" subtext="This week" color="blue" />
        <StatCard icon={TrendingUp} label="People Helped" value="84" subtext="Total impact" color="indigo" />
        <StatCard icon={Activity} label="Response Time" value="4m" subtext="Average ETA" color="amber" />
      </div>

      {/* Active Tasks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-indigo-400" />
          Active Tasks
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TaskCard
            taskId="1"
            title="Flood Relief - Sector 7"
            location="Hyderabad East"
            priority="Critical"
            status="In Progress"
            time="Started 45m ago"
          />
          <TaskCard
            taskId="2"
            title="Medical Supply Delivery"
            location="Central Camp"
            priority="High"
            status="Pending"
            time="Assigned 15m ago"
          />
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-400" />
          Pending Invitations
        </h3>
        <div className="space-y-3">
          <PendingTaskCard
            title="Water Distribution Support"
            location="Zone 4"
            priority="High"
            time="2m ago"
          />
          <PendingTaskCard
            title="Shelter Setup Assistance"
            location="River Delta"
            priority="Medium"
            time="15m ago"
          />
        </div>
      </div>

      {/* Quick Map & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Map */}
        <div className="glass-card h-[300px] relative overflow-hidden border-white/5">
          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(#6366F1 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Your Tasks</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  2 Active · 2 Pending
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2">
                <MapPin size={14} />
                Open Full Map
              </button>
            </div>
          </div>
          {/* Task pins */}
          <div className="absolute top-[40%] left-[30%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce"></div>
          <div className="absolute top-[60%] left-[55%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card border-white/5">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { action: 'Started task', detail: 'Flood Relief - Sector 7', time: '45m ago', icon: Clock, color: 'blue' },
              { action: 'Completed task', detail: 'Food Distribution - Zone 2', time: '2h ago', icon: CheckCircle2, color: 'emerald' },
              { action: 'Accepted task', detail: 'Medical Supply Delivery', time: '3h ago', icon: CheckCircle2, color: 'indigo' },
              { action: 'Checked in', detail: 'Available for tasks', time: '4h ago', icon: User, color: 'amber' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400`}>
                  <item.icon size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{item.action}</p>
                  <p className="text-[11px] text-zinc-500">{item.detail}</p>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
