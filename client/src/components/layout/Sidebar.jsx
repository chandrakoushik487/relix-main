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
  Plus
} from 'lucide-react';
import CreateTicketModal from '../modals/CreateTicketModal';

export default function Sidebar({ userRole = 'NGO Staff' }) {
  const pathname = usePathname();
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Map View', href: '/emergency-map', icon: MapIcon },
    { name: 'Incident Feed', href: '/incident-feed', icon: List },
  ];

  if (userRole === 'NGO Staff' || userRole === 'ADMIN' || userRole === 'Admin') {
    navItems.push({ name: 'Data Lake', href: '/data-lake', icon: Database });
  }

  return (
    <>
      <aside className="w-[220px] flex-shrink-0 bg-sidebar text-slate-300 border-r border-slate-800 flex flex-col justify-between py-6 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="px-4 space-y-6">
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-3 px-2">Intelligence</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (pathname === '/' && item.name === 'Dashboard');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'font-semibold text-white bg-white/10 shadow-sm'
                        : 'font-medium text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} /> {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="px-4 space-y-4 pt-6 border-t border-slate-800/50 mt-auto">
          <button 
            onClick={() => setTicketModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-lg text-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.98]"
          >
            <Plus size={16} /> Create Ticket
          </button>
        </div>
      </aside>

      {isTicketModalOpen && <CreateTicketModal onClose={() => setTicketModalOpen(false)} />}
    </>
  );
}
