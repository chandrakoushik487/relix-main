import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  Award, 
  Clock, 
  Zap, 
  MapPin, 
  Target, 
  TrendingUp,
  ShieldCheck,
  Calendar,
  ChevronRight,
  Heart
} from 'lucide-react';
import './relix_v2.css';

const VolunteerImpactDashboardV2 = () => {
  const recentMissions = [
    { id: 1, title: 'Medical Supply Drop', date: 'Oct 24, 2023', impact: '+25 XP', region: 'Sector 4C' },
    { id: 2, title: 'Shelter Coordination', date: 'Oct 21, 2023', impact: '+40 XP', region: 'District 9' },
    { id: 3, title: 'Water Distribution', date: 'Oct 18, 2023', impact: '+15 XP', region: 'Sector 2' },
  ];

  return (
    <LayoutWrapper activeTab="Impact">
      <div className="space-y-8">
        {/* Profile Hero */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-[2.3rem] bg-[#030303] flex items-center justify-center overflow-hidden">
                 <div className="text-4xl font-display font-bold text-white">CK</div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-xl shadow-lg border-4 border-[#030303]">
              <Award size={18} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-3xl font-bold font-display text-white">Chandra Koushik</h2>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">Master Responder</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-md">Member since Oct 2023 • Top 5% of volunteers in District 9.</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Verified Expert</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                <MapPin size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Bengaluru, IN</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Current Level</span>
             <div className="flex items-end gap-2">
               <span className="text-5xl font-display font-black text-white italic">42</span>
               <span className="text-sm font-bold text-indigo-400 pb-1">XP 8,420</span>
             </div>
             <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
               <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-[70%]" />
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Hours', value: '142', icon: Clock, color: 'text-indigo-400', sub: '12h this week' },
            { label: 'Missions', value: '28', icon: Target, color: 'text-purple-400', sub: '+3 vs last month' },
            { label: 'Impact Score', value: '9.4', icon: Zap, color: 'text-amber-400', sub: 'Top 1% Responder' },
            { label: 'Lives Impacted', value: '1,240', icon: Heart, color: 'text-rose-400', sub: 'Community Hero' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 space-y-4 group hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className={`p-3 bg-white/5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <TrendingUp size={14} className="text-emerald-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <h4 className="text-3xl font-display font-bold text-white">{stat.value}</h4>
                <p className="text-[10px] font-medium text-zinc-600 italic">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Missions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Mission History</h3>
              <button className="text-[10px] font-bold text-indigo-400 hover:underline">VIEW ALL</button>
            </div>
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="glass-card p-5 flex items-center justify-between group hover:bg-white/[0.02] transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{mission.title}</h4>
                      <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                        <span>{mission.date}</span>
                        <span>•</span>
                        <span>{mission.region}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-emerald-400 font-mono">{mission.impact}</span>
                    <ChevronRight size={16} className="text-zinc-700 group-hover:text-white transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Achievements</h3>
            <div className="glass-panel p-6 grid grid-cols-3 gap-4">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border transition-all ${
                   i <= 4 ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/5 text-zinc-800'
                 }`}>
                   <Award size={24} className={i > 4 ? 'opacity-20' : ''} />
                 </div>
               ))}
               <div className="col-span-3 pt-4 text-center">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">4 / 12 Unlocked</p>
               </div>
            </div>

            {/* Impact Quote/Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white space-y-4 shadow-xl">
               <Heart size={24} className="opacity-50" />
               <p className="text-sm font-medium leading-relaxed italic">
                 "Your efforts in District 9 directly provided clean water to 42 families. Every hour you spend here saves lives."
               </p>
               <div className="pt-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">NGO Coordinator Feedback</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default VolunteerImpactDashboardV2;
