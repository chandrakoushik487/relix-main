'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, User, Plus } from 'lucide-react';
import NotificationPanel from '../notifications/NotificationPanel';
import CreateTicketModal from '../modals/CreateTicketModal';

export default function TopNav({ userRole = 'NGO Staff', isLive = true }) {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);

  const isNGO = userRole === 'NGO Staff';
  const isVolunteer = userRole === 'Volunteer';

  return (
    <>
      <header className="h-16 border-b border-[#1A1A1A] bg-black/40 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] px-4 py-1.5 rounded-full w-96">
          <Search size={16} className="text-zinc-500" />
          <input
            type="text"
            placeholder={isVolunteer ? "Search tasks, incidents..." : "Search reports, volunteers, issues..."}
            className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none w-full placeholder:text-zinc-600"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800">
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {isLive ? 'Live System' : 'Staging'}
            </span>
          </div>

          <button
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-zinc-400 hover:text-white relative transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
          </button>

          {/* NGO-only: Create Report button */}
          {isNGO && (
            <button
              onClick={() => setTicketModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            >
              <Plus size={18} />
              <span>Create Report</span>
            </button>
          )}

          {/* Volunteer-only: Check-in indicator */}
          {isVolunteer && (
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Available
              </span>
            </div>
          )}

          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
            <User size={16} />
          </div>
        </div>

        {isNotificationsOpen && (
          <div className="absolute top-16 right-10">
            <NotificationPanel onClose={() => setNotificationsOpen(false)} />
          </div>
        )}
      </header>

      {isTicketModalOpen && <CreateTicketModal onClose={() => setTicketModalOpen(false)} />}
    </>
  );
}
