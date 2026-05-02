'use client';
import React from 'react';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
      <Sidebar userRole={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav userRole={role} isLive={true} />
        <main className="flex-1 overflow-y-auto w-full relative animate-fade-in">
          <div className="p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
