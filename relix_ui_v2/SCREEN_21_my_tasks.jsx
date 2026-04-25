import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  AlertTriangle,
  ChevronRight,
  Filter,
  Calendar
} from 'lucide-react';
import './relix_v2.css';

const MyTasksV2 = () => {
  const taskGroups = [
    {
      title: 'Active Deployments',
      count: 1,
      tasks: [
        { id: 'T-102', title: 'Medical Supply Triage', region: 'Sector 4C', status: 'In Progress', priority: 'High', time: 'Started 2h ago' }
      ]
    },
    {
      title: 'Upcoming',
      count: 2,
      tasks: [
        { id: 'T-105', title: 'Volunteer Training Session', region: 'Central Hub', status: 'Scheduled', priority: 'Medium', time: 'Tomorrow, 10:00 AM' },
        { id: 'T-108', title: 'Data Verification', region: 'Remote', status: 'Draft', priority: 'Low', time: 'Oct 28' }
      ]
    }
  ];

  return (
    <LayoutWrapper activeTab="My Tasks">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-display text-white">My Assignments</h2>
            <p className="text-zinc-500 text-sm">Manage your active deployments and upcoming volunteer tasks.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all">
              <Filter size={14} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Plus size={18} />
              New Personal Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-10">
          {taskGroups.map((group, idx) => (group.tasks.length > 0 && (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">{group.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-bold text-zinc-600">{group.count}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {group.tasks.map((task) => (
                  <div key={task.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-indigo-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        task.status === 'In Progress' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-zinc-600'
                      }`}>
                        {task.status === 'In Progress' ? <Clock size={24} className="animate-spin-slow" /> : <Calendar size={24} />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-wider">{task.id}</span>
                          {task.priority === 'High' && <AlertTriangle size={12} className="text-red-500" />}
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            <span>{task.region}</span>
                          </div>
                          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                          <span>{task.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                       <div className="flex flex-col items-end gap-1">
                          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Progress</span>
                          <div className="flex items-center gap-3">
                             <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${task.status === 'In Progress' ? 'bg-indigo-500' : 'bg-zinc-700'} w-[40%]`} />
                             </div>
                             <span className="text-[10px] font-bold text-zinc-400">40%</span>
                          </div>
                       </div>
                       <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-500 hover:text-white transition-all">
                         <ChevronRight size={20} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )))}
        </div>

        {/* Completed Section */}
        <div className="pt-8 border-t border-white/5">
           <button className="w-full py-4 glass-card border-dashed flex items-center justify-center gap-3 text-zinc-500 hover:text-white transition-all group">
             <CheckCircle2 size={18} className="group-hover:text-emerald-500 transition-colors" />
             <span className="text-xs font-bold uppercase tracking-widest">Show Completed Assignments (12)</span>
           </button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default MyTasksV2;
