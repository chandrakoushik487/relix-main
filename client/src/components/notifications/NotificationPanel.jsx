import React, { useRef, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

export default function NotificationPanel({ onClose }) {
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const notifications = [
    { id: 1, type: 'critical', text: 'Severity High: Bridge collapse reported in Zone A', time: '2m ago', read: false },
    { id: 2, type: 'success', text: 'Unit Rescue-4 successfully deployed', time: '15m ago', read: false },
    { id: 3, type: 'info', text: 'New data uploaded to Region B tracker', time: '1h ago', read: true },
    { id: 4, type: 'warning', text: 'Shelter capacity at 90% in Zone C', time: '2h ago', read: true },
  ];

  return (
    <div ref={panelRef} className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-hover border border-slate-200 overflow-hidden z-50 animate-fade-in-up origin-top-right">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
        <h4 className="font-extrabold text-sidebar text-sm">Notifications</h4>
        <button className="text-xs font-bold text-primary hover:underline" onClick={() => alert('Marked all notifications as read')}>Mark all as read</button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">No new notifications</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map(n => (
              <div key={n.id} className={`p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                <div className="mt-0.5 shrink-0">
                  {n.type === 'critical' && <AlertCircle size={16} className="text-critical" />}
                  {n.type === 'warning' && <AlertCircle size={16} className="text-high" />}
                  {n.type === 'success' && <CheckCircle size={16} className="text-low" />}
                  {n.type === 'info' && <Info size={16} className="text-primary" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!n.read ? 'font-bold text-sidebar' : 'font-medium text-slate-600'}`}>
                    {n.text}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
        <Link href="/incident-feed" className="text-xs font-bold text-primary hover:underline" onClick={onClose}>
          View All Notifications &rarr;
        </Link>
      </div>
    </div>
  );
}
