'use client';
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  AlertTriangle,
  ChevronRight,
  Filter,
  Calendar,
  Zap,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();

  const handleInitializeMission = () => {
    // TODO: Open modal to create new mission/task
    alert('Mission initialization feature coming soon!');
  };

  const taskGroups = [
    {
      title: 'Active Deployments',
      status: 'In Progress',
      tasks: tasks.filter(t => t.status === 'In Progress')
    },
    {
      title: 'Pending & Scheduled',
      status: 'Pending',
      tasks: tasks.filter(t => t.status === 'Pending' || t.status === 'Scheduled')
    }
  ];

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-display text-white tracking-tight">Mission Control</h2>
          <p className="text-zinc-500 text-sm max-w-lg">Orchestrate your active deployments, resource tracking, and strategic objectives.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-95" onClick={handleInitializeMission}>
            <Plus size={18} />
            Initialize Mission
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
           <Loader2 className="animate-spin text-indigo-500" size={40} />
           <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Synchronizing Mission Data...</p>
        </div>
      ) : (
        /* Task List */
        <div className="space-y-12">
          {taskGroups.map((group, idx) => (
            group.tasks.length > 0 && (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{group.title}</h3>
                  <div className="h-px flex-1 bg-white/[0.05]" />
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-zinc-600 border border-white/5">{group.tasks.length}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {group.tasks.map((task) => (
                    <div key={task.id} className="glass-card p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-indigo-500/30 transition-all cursor-pointer bg-[#070707]">
                      <div className="flex items-center gap-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                          task.status === 'In Progress' 
                            ? 'bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)]' 
                            : 'bg-white/5 text-zinc-600 group-hover:bg-white/10'
                        }`}>
                          {task.status === 'In Progress' ? <Zap size={28} className="animate-pulse" /> : <Calendar size={28} />}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-[0.2em]">{task.id.slice(0, 8)}</span>
                            {task.priority === 'Critical' && (
                              <span className="flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                                <AlertTriangle size={10} /> Critical
                              </span>
                            )}
                          </div>
                          <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{task.title || 'Untitled Mission'}</h4>
                          <div className="flex flex-wrap items-center gap-6 text-zinc-500">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-zinc-700" />
                              <span className="text-xs font-bold uppercase tracking-wider">{task.region || task.area || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-zinc-700" />
                              <span className="text-xs font-medium">{formatTime(task.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-10 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                        <div className="flex flex-col items-end gap-2 flex-1 lg:flex-none max-w-[200px] w-full">
                            <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                              <span>Execution</span>
                              <span className="text-zinc-400">{task.progress || 0}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-1000 ease-out ${task.status === 'In Progress' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-zinc-800'}`} 
                                style={{ width: `${task.progress || 0}%` }} 
                              />
                            </div>
                        </div>
                        <button className="w-12 h-12 bg-white/5 hover:bg-indigo-600 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-white transition-all shadow-xl group-hover:scale-110">
                          <ArrowUpRight size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          
          {!tasks.length && (
            <div className="py-20 text-center glass-card border-dashed border-white/5">
              <Zap size={40} className="text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 font-bold uppercase tracking-widest">No Active Missions Found</p>
              <p className="text-zinc-700 text-xs mt-2">Initialize a mission to begin operational tracking.</p>
            </div>
          )}
        </div>
      )}

      {/* Completed Archive */}
      <div className="pt-12 border-t border-white/5">
         <button className="w-full py-6 rounded-3xl border-2 border-dashed border-white/5 flex items-center justify-center gap-4 text-zinc-600 hover:text-white hover:border-white/10 hover:bg-white/[0.01] transition-all group">
           <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
             <CheckCircle2 size={18} />
           </div>
           <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Operational History ({tasks.filter(t => t.status === 'Completed').length} Completed)</span>
         </button>
      </div>
    </div>
  );
}
