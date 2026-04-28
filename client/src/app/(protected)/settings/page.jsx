'use client';
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Database, 
  Key, 
  Globe, 
  ChevronRight, 
  Save, 
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Profile');

  const sections = [
    { id: 'Profile', icon: User, label: 'Account Profile' },
    { id: 'Security', icon: Shield, label: 'Security & Access' },
    { id: 'Notifications', icon: Bell, label: 'Emergency Alerts' },
    { id: 'API', icon: Key, label: 'Developer & API' },
    { id: 'Data', icon: Database, label: 'Data Management' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold font-display text-white tracking-tight">System Settings</h2>
        <p className="text-zinc-500 text-sm">Manage your operational preferences and security configurations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-lg' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon size={18} />
              <span className="text-sm font-bold tracking-wide">{section.label}</span>
              {activeSection === section.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-8 animate-in slide-in-from-right-4 duration-500">
          {activeSection === 'Profile' && (
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                      <span className="text-3xl font-bold text-white">U</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">User</h3>
                    <p className="text-sm text-zinc-500">NGO Staff • District 9 Operations</p>
                    <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:underline">Change Avatar</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" defaultValue="User" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Work Email</label>
                    <input type="email" defaultValue="koushik@relix.org" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                    <input type="text" defaultValue="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Language</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none">
                      <option>English (Global)</option>
                      <option>Hindi</option>
                      <option>Telugu</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button className="px-6 py-3 rounded-xl border border-white/5 text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-all">Discard</button>
                <button className="px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === 'Security' && (
            <div className="space-y-6">
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4 text-white mb-2">
                  <Lock size={20} className="text-indigo-400" />
                  <h3 className="text-lg font-bold">Authentication</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-zinc-500">Secure your account with SMS or Authenticator app.</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center text-zinc-400">
                        <Key size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Password Management</p>
                        <p className="text-xs text-zinc-500">Last changed 4 months ago.</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:underline">Update</button>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 border-red-500/20">
                <div className="flex items-center gap-4 text-red-400 mb-6">
                  <AlertTriangle size={20} />
                  <h3 className="text-lg font-bold">Danger Zone</h3>
                </div>
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-white">Deactivate Account</p>
                      <p className="text-xs text-zinc-500">Temporary disable your access. Data will be preserved.</p>
                   </div>
                   <button className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Deactivate</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className="glass-card p-8 space-y-8">
              <h3 className="text-lg font-bold text-white mb-6">Alert Preferences</h3>
              <div className="space-y-6">
                {[
                  { label: 'Critical Incident Alerts', desc: 'Real-time push notifications for life-threatening situations.', type: 'Push' },
                  { label: 'Daily Operations Digest', desc: 'Summary of team performance and incident resolutions.', type: 'Email' },
                  { label: 'Volunteer Matching', desc: 'Notifications when a task matches your expert profile.', type: 'SMS' },
                  { label: 'System Announcements', desc: 'Updates on new features and maintenance schedules.', type: 'All' }
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{pref.label}</p>
                      <p className="text-xs text-zinc-500">{pref.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 p-1 rounded-xl">
                       <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest">ON</button>
                       <button className="px-3 py-1.5 rounded-lg text-zinc-600 text-[10px] font-bold uppercase tracking-widest">OFF</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
