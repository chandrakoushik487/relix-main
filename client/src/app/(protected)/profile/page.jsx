'use client';
import React from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Globe, 
  Camera, 
  Award, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Calendar
} from 'lucide-react';

export default function ProfilePage() {
  const stats = [
    { label: 'Missions', value: '28', icon: Award, color: 'text-emerald-400' },
    { label: 'Avg. Rating', value: '4.9', icon: Shield, color: 'text-indigo-400' },
    { label: 'Hours', value: '142', icon: Clock, color: 'text-amber-400' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12 animate-in fade-in duration-500">
      {/* Hero Profile Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
        <div className="relative glass-card p-12 overflow-hidden bg-[#070707]">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Globe size={300} className="text-white" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="relative">
              <div className="w-40 h-40 rounded-[40px] bg-gradient-to-br from-indigo-500 to-emerald-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[38px] bg-[#0A0A0B] flex items-center justify-center overflow-hidden border-4 border-black">
                  <User size={64} className="text-zinc-700" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl border-4 border-black transition-all shadow-xl">
                <Camera size={18} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h2 className="text-4xl font-bold text-white font-display">Chandra Koushik</h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest self-center">
                    Verified Responder
                  </span>
                </div>
                <p className="text-zinc-500 flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={14} /> 
                  <span className="text-sm">Andhra Pradesh, India</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all">
                  Edit Profile
                </button>
                <div className="flex items-center gap-2">
                  {[Github, Twitter, Linkedin].map((Icon, i) => (
                    <button key={i} className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 flex items-center gap-6 group hover:border-white/10 transition-all bg-[#070707]">
            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-all`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* About Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3">
             Professional Bio
             <div className="h-px flex-1 bg-white/5" />
          </h3>
          <div className="glass-card p-8 bg-[#070707] text-zinc-400 text-sm leading-relaxed space-y-4">
            <p>
              Lead Response Coordinator with 5+ years of experience in regional disaster management and resource logistics.
            </p>
            <p>
              Specializing in AI-driven triage systems and cross-border volunteer mobilization. Passionate about leveraging open-source intelligence for civic good.
            </p>
          </div>
        </div>

        {/* Credentials / Activity */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3">
             Active Credentials
             <div className="h-px flex-1 bg-white/5" />
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Emergency Response Certificate', issued: 'Jan 2026', type: 'Level 3' },
              { title: 'Logistics Operations Specialist', issued: 'Nov 2025', type: 'Expert' },
            ].map((cred, i) => (
              <div key={i} className="glass-card p-5 bg-[#070707] flex items-center justify-between group cursor-pointer hover:border-indigo-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 transition-colors">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{cred.title}</div>
                    <div className="text-[10px] text-zinc-600 flex items-center gap-2">
                      <Calendar size={10} /> {cred.issued}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
