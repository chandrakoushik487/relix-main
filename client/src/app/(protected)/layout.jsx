'use client';
import React, { useEffect, useState } from 'react';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase'; // Uncommented and updated import

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState('NGO Staff');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        // Firebase Auth doesn't have custom metadata out of the box without claims 
        // We'll use displayName as a temporary workaround for roles if available
        const role = user.displayName || 'Volunteer';
        setUserRole(role);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-bg flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-bg font-sans overflow-hidden text-text-dark">
      <TopNav userRole={userRole} isLive={true} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar userRole={userRole} />
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
