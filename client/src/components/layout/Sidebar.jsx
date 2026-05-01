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

  const isNGO = userRole === 'NGO Staff';
  const isVolunteer = userRole === 'Volunteer';
  const dashboardPath = isVolunteer ? '/volunteer/dashboard' : '/dashboard';

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
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">
            {isNGO ? 'Intelligence' : 'My Work'}
          </p>

          {/* Dashboard - Different for each role */}
          <SidebarItem
            icon={LayoutDashboard}
            label={isVolunteer ? 'My Dashboard' : 'Dashboard'}
            href={dashboardPath}
            active={pathname === dashboardPath}
          />

          {/* Incident Feed - NGO: full access, Volunteer: view-only */}
          <SidebarItem
            icon={List}
            label="Incident Feed"
            href="/incident-feed"
            active={pathname === '/incident-feed'}
          />

          {/* Emergency Map - NGO: full view, Volunteer: limited view */}
          <SidebarItem
            icon={MapIcon}
            label="Emergency Map"
            href="/emergency-map"
            active={pathname === '/emergency-map'}
          />

          {/* NGO-only items */}
          {isNGO && (
            <>
              <SidebarItem
                icon={BarChart3}
                label="Analytics"
                href="/analytics"
                active={pathname === '/analytics'}
              />
              <SidebarItem
                icon={Database}
                label="Data Lake"
                href="/data-lake"
                active={pathname === '/data-lake'}
              />
            </>
          )}

          {/* Volunteer-only items */}
          {isVolunteer && (
            <SidebarItem
              icon={Calendar}
              label="Task Acceptance"
              href="/volunteer/acceptance"
              active={pathname === '/volunteer/acceptance'}
            />
          )}

          <div className="pt-8">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">General</p>
            <SidebarItem
              icon={CheckCircle2}
              label={isVolunteer ? 'My Tasks' : 'Tasks'}
              href={isVolunteer ? '/volunteer/tasks' : '/tasks'}
              active={pathname === (isVolunteer ? '/volunteer/tasks' : '/tasks')}
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
