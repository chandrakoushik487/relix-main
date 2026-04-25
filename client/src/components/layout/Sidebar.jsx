'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Map as MapIcon, 
  List, 
  Database,
  Plus,
  CheckCircle2,
  Users,
  User,
  Settings,
  LogOut,
  Activity
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import CreateTicketModal from '../modals/CreateTicketModal';

const SidebarItem = ({ icon: Icon, label, href, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
      active 
        ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' 
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
    }`}
  >
    <Icon size={18} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

export default function Sidebar({ userRole = 'NGO Staff' }) {
  const pathname = usePathname();
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  const handleSignOut = () => {
    auth.signOut();
  };

  const isNGO = userRole === 'NGO Staff' || userRole === 'ADMIN' || userRole === 'Admin';

  return (
    <>
      <aside className="w-[260px] bg-[#050505] border-r border-[#1A1A1A] p-6 flex flex-col h-full z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-display">RELIX</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Intelligence</p>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            href="/dashboard" 
            active={pathname === '/dashboard'} 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            href="/analytics" 
            active={pathname === '/analytics'} 
          />
          <SidebarItem 
            icon={MapIcon} 
            label="Emergency Map" 
            href="/emergency-map" 
            active={pathname === '/emergency-map'} 
          />
          <SidebarItem 
            icon={List} 
            label="Incident Feed" 
            href="/incident-feed" 
            active={pathname === '/incident-feed'} 
          />
          {isNGO && (
            <SidebarItem 
              icon={Database} 
              label="Data Lake" 
              href="/data-lake" 
              active={pathname === '/data-lake'} 
            />
          )}
          
          <div className="pt-8">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Operations</p>
            <SidebarItem 
              icon={CheckCircle2} 
              label="My Tasks" 
              href="/tasks" 
              active={pathname === '/tasks'} 
            />
            <SidebarItem 
              icon={Users} 
              label="Impact" 
              href="/impact" 
              active={pathname === '/impact'} 
            />
          </div>
        </nav>

        <div className="pt-6 border-t border-[#1A1A1A] mt-auto space-y-1">
          <SidebarItem 
            icon={User} 
            label="Profile" 
            href="/profile" 
            active={pathname === '/profile'} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={pathname === '/settings'} 
          />
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {isTicketModalOpen && <CreateTicketModal onClose={() => setTicketModalOpen(false)} />}
    </>
  );
}
