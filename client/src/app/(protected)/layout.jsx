'use client';
import React, { useEffect, useState } from 'react';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState('NGO Staff');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        const role = user.displayName || 'Volunteer';
        setUserRole(role);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium animate-pulse">Initializing RELIX...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#030303] overflow-hidden">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav userRole={userRole} isLive={true} />
        <main className="flex-1 overflow-y-auto w-full relative animate-fade-in">
          <div className="p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
