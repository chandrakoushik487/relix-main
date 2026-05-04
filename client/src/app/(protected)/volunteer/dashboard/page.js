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
  ToggleRight,
  Loader2
} from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { taskService } from '@/services/taskService';
import { useAuth } from '@/context/AuthContext';

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

const TaskCard = ({ task, onAccept, onDecline, onComplete }) => (
  <div className="glass-card p-6 border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
          task.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
          task.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          {task.priority === 'Critical' ? <AlertTriangle size={18} /> :
           task.priority === 'High' ? <Clock size={18} /> :
           <Zap size={18} />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{task.title || 'Untitled Mission'}</h4>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
            <MapPin size={12} />
            <span>{task.area || task.region || 'Unknown Location'}</span>
          </div>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
        task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
        task.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      }`}>
        {task.status}
      </span>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
        <Clock size={12} />
        {task.time || 'Recent'}
      </span>
      <div className="flex gap-2">
        {task.status === 'Pending' && (
          <>
            <button 
              onClick={() => onDecline(task.id)}
              className="px-3 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-red-500/20"
            >
              Decline
            </button>
            <button 
              onClick={() => onAccept(task.id)}
              className="px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all"
            >
              Accept
            </button>
          </>
        )}
        {task.status === 'In Progress' && (
          <button 
            onClick={() => onComplete(task.id)}
            className="px-3 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all flex items-center gap-1"
          >
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

export default function VolunteerDashboard() {
  const { tasks, loading } = useTasks();
  const [isAvailable, setIsAvailable] = useState(true);
  const { user } = useAuth();

  const activeTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'Pending');
  const pendingInvitations = tasks.filter(t => t.status === 'Assigned'); // Assuming 'Assigned' means pending volunteer action

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const updates = {
        status: newStatus,
      };

      // Align volunteer updates with Firestore rules that check assignedTo == request.auth.uid.
      if (user?.uid) {
        updates.assignedTo = user.uid;
      }

      await taskService.updateTask(taskId, updates);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleOpenDeploymentMap = () => {
    // TODO: Navigate to deployment map or open modal
    alert('Deployment map feature coming soon!');
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-500'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {isAvailable ? 'Available for Tasks' : 'Currently Offline'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">My Dashboard</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage your tasks and track your impact.</p>
        </div>
        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
            isAvailable ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-zinc-500'
          }`}
        >
          {isAvailable ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
          {isAvailable ? 'Status: Online' : 'Status: Offline'}
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Syncing field intel...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={CheckCircle2} label="Tasks Completed" value={tasks.filter(t => t.status === 'Completed').length} subtext="Total record" color="emerald" />
            <StatCard icon={Clock} label="Active Tasks" value={activeTasks.length} subtext="Currently assigned" color="blue" />
            <StatCard icon={TrendingUp} label="Pending Tasks" value={pendingInvitations.length} subtext="Awaiting response" color="indigo" />
            <StatCard icon={Activity} label="Impact Score" value="94" subtext="Calculated performance" color="amber" />
          </div>

          {/* Active Tasks */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={14} className="text-indigo-400" />
              Mission Directives
            </h3>
            {activeTasks.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onAccept={() => handleUpdateStatus(task.id, 'In Progress')}
                    onDecline={() => handleUpdateStatus(task.id, 'Declined')}
                    onComplete={() => handleUpdateStatus(task.id, 'Completed')}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center border-dashed border-white/5">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">No Active Missions</p>
              </div>
            )}
          </div>

          {/* Quick Map & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Map Mockup */}
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
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Field Sector</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      {activeTasks.length} Operations Active
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2" onClick={handleOpenDeploymentMap}>
                    <MapPin size={14} />
                    Open Deployment Map
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
        </>
      )}
    </div>
  );
}
