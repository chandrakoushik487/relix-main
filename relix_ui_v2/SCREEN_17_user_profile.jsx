import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Smartphone, 
  LogOut, 
  ChevronRight,
  Camera,
  Globe,
  Lock,
  Eye,
  Key
} from 'lucide-react';
import './relix_v2.css';

const UserProfileV2 = () => {
  return (
    <LayoutWrapper activeTab="Settings">
      <div className="max-w-4xl mx-auto space-y-10 py-4">
        {/* Header */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-[1.9rem] bg-[#030303] flex items-center justify-center overflow-hidden">
                <div className="text-3xl font-display font-bold text-white">CK</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
               <Camera size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-display text-white">Chandra Koushik</h2>
            <p className="text-zinc-500 text-sm">Managing Director @ Red Cross Units A</p>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="space-y-2">
            {[
              { label: 'General', icon: User, active: true },
              { label: 'Security', icon: Shield, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Integrations', icon: Globe, active: false },
              { label: 'Billing', icon: Smartphone, active: false },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                item.active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}>
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                {item.active && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/5">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Account Info */}
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Account Information</h3>
              
              <div className="grid grid-cols-1 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                   <div className="bg-[#030303] border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 focus-within:border-indigo-500/50 transition-all flex items-center gap-3">
                     <User size={16} className="text-zinc-600" />
                     <input type="text" defaultValue="Chandra Koushik" className="bg-transparent border-none focus:outline-none w-full" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                   <div className="bg-[#030303] border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 focus-within:border-indigo-500/50 transition-all flex items-center gap-3">
                     <Mail size={16} className="text-zinc-600" />
                     <input type="email" defaultValue="chandra@relix.org" className="bg-transparent border-none focus:outline-none w-full" />
                   </div>
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Security Quick Actions */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest ml-1">Security & Privacy</h3>
               <div className="grid grid-cols-1 gap-4">
                  <div className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl text-zinc-500 group-hover:text-indigo-400 transition-colors">
                        <Key size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Change Password</h4>
                        <p className="text-[11px] text-zinc-500">Update your security credentials</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-zinc-700" />
                  </div>

                  <div className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl text-zinc-500 group-hover:text-emerald-400 transition-colors">
                        <Lock size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                        <p className="text-[11px] text-zinc-500">Currently enabled via SMS</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                       <ChevronRight size={18} className="text-zinc-700" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UserProfileV2;
