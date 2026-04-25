import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  MapPin,
  ExternalLink,
  Plus
} from 'lucide-react';
import './relix_v2.css';

const IssueStatus = ({ status }) => {
  const styles = {
    'Critical': 'bg-red-500/10 text-red-400 border-red-500/20',
    'High': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Pending': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    'Resolved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${styles[status] || styles['Pending']}`}>
      {status}
    </span>
  );
};

const IssuesExplorerV2 = () => {
  const issues = [
    { id: 'ISS-4821', title: 'Severe Water Contamination', type: 'Health', region: 'District 9', status: 'Critical', time: '2m ago' },
    { id: 'ISS-4820', title: 'Flash Flood Warning', type: 'Natural Disaster', region: 'District 9', status: 'Critical', time: '14m ago' },
    { id: 'ISS-4819', title: 'Medical Supply Depletion', type: 'Logistics', region: 'Central Shelter', status: 'High', time: '28m ago' },
    { id: 'ISS-4818', title: 'Power Grid Failure', type: 'Infrastructure', region: 'Old Town', status: 'High', time: '1h ago' },
    { id: 'ISS-4817', title: 'Minor Landslide', type: 'Natural Disaster', region: 'Eastern Pass', status: 'Pending', time: '3h ago' },
    { id: 'ISS-4816', title: 'Evacuation Complete', type: 'Safety', region: 'Sector 4', status: 'Resolved', time: '5h ago' },
    { id: 'ISS-4815', title: 'New Shelter Established', type: 'Logistics', region: 'Zone B', status: 'Resolved', time: '6h ago' },
  ];

  return (
    <LayoutWrapper activeTab="Explorer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold font-display text-white mb-2">Issues Explorer</h2>
            <p className="text-zinc-500 text-sm">Unified database of all reported incidents and field data.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center gap-2">
            <Plus size={18} />
            Bulk Import Data
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-2xl">
          <div className="flex-1 flex items-center gap-3 bg-[#030303] border border-[#1A1A1A] px-4 py-2 rounded-xl">
            <Search size={16} className="text-zinc-500" />
            <input 
              type="text" 
              placeholder="Filter by ID, description, or tags..." 
              className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none w-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {['Region', 'Status', 'Type', 'Severity'].map((filter) => (
              <button key={filter} className="bg-[#030303] border border-[#1A1A1A] hover:border-white/10 px-4 py-2 rounded-xl text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 transition-all">
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Issues Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.02] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Issue ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Region</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Reported</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-white/[0.01] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider">{issue.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{issue.title}</p>
                        <p className="text-[11px] text-zinc-500 font-medium">{issue.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin size={12} className="text-zinc-600" />
                        <span className="text-xs font-medium">{issue.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <IssueStatus status={issue.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Clock size={12} />
                        <span className="text-xs font-medium">{issue.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Showing 7 of 1,482 issues</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-white/5 text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:bg-white/5 transition-all disabled:opacity-30" disabled>Prev</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/5 text-[11px] font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default IssuesExplorerV2;
