import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Map as MapIcon, 
  Activity, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Plus,
  BarChart3,
  CheckCircle2,
  User
} from 'lucide-react';
import './relix_v2.css';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
    active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
  }`}>
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const LayoutWrapper = ({ children, activeTab = 'Dashboard' }) => {
  return (
    <div className="main-layout min-h-screen bg-[#030303]">
      {/* Sidebar */}
      <aside className="sidebar w-[260px] bg-[#050505] border-r border-[#1A1A1A] p-6 fixed h-full flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-display">RELIX</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} />
          <SidebarItem icon={Database} label="Issues Explorer" active={activeTab === 'Explorer'} />
          <SidebarItem icon={MapIcon} label="Emergency Map" active={activeTab === 'Map'} />
          <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'Analytics'} />
          
          <div className="pt-8">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Volunteer</p>
            <SidebarItem icon={CheckCircle2} label="My Tasks" active={activeTab === 'Tasks'} />
            <SidebarItem icon={Users} label="Impact" active={activeTab === 'Impact'} />
          </div>
        </nav>

        <div className="pt-6 border-t border-[#1A1A1A] mt-auto">
          <SidebarItem icon={User} label="Profile" active={activeTab === 'Profile'} />
          <SidebarItem icon={Settings} label="Settings" />
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px]">
        {/* Top Nav */}
        <header className="h-16 border-b border-[#1A1A1A] bg-black/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] px-4 py-1.5 rounded-full w-96">
            <Search size={16} className="text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search reports, volunteers, issues..." 
              className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-zinc-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Plus size={18} />
              <span>Create Report</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutWrapper;
