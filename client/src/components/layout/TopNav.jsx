'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, User } from 'lucide-react';
import NotificationPanel from '../notifications/NotificationPanel';

export default function TopNav({ userRole = 'NGO Staff', isLive = true }) {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  
  return (
    <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 relative shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tight text-sidebar">
          RELIX
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link href="/dashboard" className="hover:text-sidebar transition-colors">Dashboard</Link>
          <Link href="/emergency-map" className="hover:text-sidebar transition-colors">Emergency Map</Link>
          {userRole === 'NGO Staff' && (
            <Link href="/data-lake" className="hover:text-sidebar transition-colors">Data Lake</Link>
          )}
        </nav>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Live/Mock indicator */}
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-low animate-pulse' : 'bg-medium'}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {isLive ? 'Live' : 'Mock Data'}
          </span>
        </div>
        
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search incidents..." 
            className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 w-64"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
            className="text-slate-500 hover:text-sidebar relative transition-colors focus:outline-none"
          >
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-critical rounded-full" />
          </button>
          
          {isNotificationsOpen && (
            <NotificationPanel onClose={() => setNotificationsOpen(false)} />
          )}
        </div>

        {/* User Badge / Avatar */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          {userRole === 'Admin' && (
            <span className="hidden sm:inline-block px-2 py-1 bg-sidebar text-white text-[10px] font-bold uppercase tracking-wider rounded">
              Admin
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover shrink-0 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
