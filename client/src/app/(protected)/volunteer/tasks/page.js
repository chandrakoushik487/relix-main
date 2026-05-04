'use client';
import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  AlertTriangle,
  Zap,
  Navigation,
  Filter,
  Calendar,
  TrendingUp,
  Phone
} from 'lucide-react';

const TaskCard = ({ title, location, priority, status, time, taskId, description, onAccept, onDecline, onComplete, onContact, onNavigate }) => (
  <div className="glass-card p-6 border-white/5 hover:border-indigo-500/30 transition-all">
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
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
            <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
          </div>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
        status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
        status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
        status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
        'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
      }`}>
        {status}
      </span>
    </div>

    {description && (
      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{description}</p>
    )}

    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-[10px] font-bold text-zinc-500 font-mono">#{taskId}</span>
      <div className="flex gap-2">
        {status === 'Pending' && (
          <>
            <button className="px-3 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-red-500/20" onClick={() => onDecline && onDecline(taskId)}>
              Decline
            </button>
            <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all" onClick={() => onAccept && onAccept(taskId)}>
              Accept
            </button>
          </>
        )}
        {status === 'In Progress' && (
          <>
            <button className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-white/10 flex items-center gap-1" onClick={() => onContact && onContact(taskId)}>
              <Phone size={10} />
              Contact NGO
            </button>
            <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all flex items-center gap-1" onClick={() => onComplete && onComplete(taskId)}>
              <CheckCircle2 size={10} />
              Mark Complete
            </button>
          </>
        )}
        <button className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-white/10 flex items-center gap-1" onClick={() => onNavigate && onNavigate(taskId)}>
          <Navigation size={10} />
          Navigate
        </button>
      </div>
    </div>
  </div>
);

export default function VolunteerTasks() {
  const [activeFilter, setActiveFilter] = useState('all');

  const tasks = [
    {
      id: 'T-201',
      title: 'Flood Relief - Sector 7',
      location: 'Hyderabad East',
      priority: 'Critical',
      status: 'In Progress',
      time: 'Started 45m ago',
      taskId: 'T-201',
      description: 'Distribute relief supplies and assist with evacuation of affected residents.'
    },
    {
      id: 'T-202',
      title: 'Medical Supply Delivery',
      location: 'Central Camp',
      priority: 'High',
      status: 'Pending',
      time: 'Assigned 15m ago',
      taskId: 'T-202',
      description: 'Transport medical supplies from central warehouse to Zone 4 medical station.'
    },
    {
      id: 'T-195',
      title: 'Food Distribution - Zone 2',
      priority: 'Medium',
      status: 'Completed',
      time: 'Completed 2h ago',
      location: 'Zone 2',
      taskId: 'T-195',
      description: 'Distribute food packages to 50 families in Zone 2.'
    }
  ];

  const filteredTasks = activeFilter === 'all' ? tasks :
    tasks.filter(task => task.status.toLowerCase().replace(' ', '-') === activeFilter);

  const stats = {
    active: tasks.filter(t => t.status === 'In Progress').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    completed: tasks.filter(t => t.status === 'Completed').length
  };

  const handleAccept = (taskId) => {
    alert(`Accepted task ${taskId}`);
  };

  const handleDecline = (taskId) => {
    alert(`Declined task ${taskId}`);
  };

  const handleComplete = (taskId) => {
    alert(`Completed task ${taskId}`);
  };

  const handleContact = (taskId) => {
    alert(`Contact NGO for task ${taskId}`);
  };

  const handleNavigate = (taskId) => {
    alert(`Navigate to task ${taskId} location`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">My Tasks</h2>
          <p className="text-zinc-500 text-sm mt-1">View and manage your assigned tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-all">
            <Calendar size={14} />
            View Calendar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 border-blue-500/20 bg-blue-500/5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-400" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="glass-card p-4 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pending</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="glass-card p-4 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Tasks' },
          { id: 'in-progress', label: 'Active' },
          { id: 'pending', label: 'Pending' },
          { id: 'completed', label: 'Completed' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id} 
            {...task} 
            onAccept={handleAccept}
            onDecline={handleDecline}
            onComplete={handleComplete}
            onContact={handleContact}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

      {/* Completed Archive */}
      <div className="pt-8 border-t border-white/5">
        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center gap-4 text-zinc-600 hover:text-white hover:border-white/10 hover:bg-white/[0.01] transition-all group">
          <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
            <TrendingUp size={18} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]">View Task History (12 Completed)</span>
        </button>
      </div>
    </div>
  );
}
