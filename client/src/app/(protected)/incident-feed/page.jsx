'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  MapPin,
  Plus,
  ArrowUpRight,
  FilterX,
  Loader2
} from 'lucide-react';
import { useIncidents } from '@/hooks/useIncidents';
import IssueEditor from '@/components/IssueEditor';
import { incidentService } from '@/services/incidentService';

const IssueStatus = ({ status }) => {
  const styles = {
    'Critical': 'bg-red-500/10 text-red-400 border-red-500/20',
    'High': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Medium': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Pending': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    'Resolved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${styles[status] || styles['Pending']}`}>
      {status}
    </span>
  );
};

export default function IncidentFeedPage() {
  const { incidents, loading, error, isLive, refetch } = useIncidents();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const mockIssues = [
    { id: 'ISS-4821', title: 'Severe Water Contamination', type: 'Health', region: 'District 9', status: 'Critical', time: '2m ago' },
    { id: 'ISS-4820', title: 'Flash Flood Warning', type: 'Natural Disaster', region: 'District 9', status: 'Critical', time: '14m ago' },
    { id: 'ISS-4819', title: 'Medical Supply Depletion', type: 'Logistics', region: 'Central Shelter', status: 'High', time: '28m ago' },
    { id: 'ISS-4818', title: 'Power Grid Failure', type: 'Infrastructure', region: 'Old Town', status: 'High', time: '1h ago' },
    { id: 'ISS-4817', title: 'Minor Landslide', type: 'Natural Disaster', region: 'Eastern Pass', status: 'Medium', time: '3h ago' },
    { id: 'ISS-4816', title: 'Evacuation Complete', type: 'Safety', region: 'Sector 4', status: 'Resolved', time: '5h ago' },
    { id: 'ISS-4815', title: 'New Shelter Established', type: 'Logistics', region: 'Zone B', status: 'Resolved', time: '6h ago' },
  ];

  // Use real data if available, otherwise mock data
  const baseIssues = useMemo(() => {
    return incidents.length > 0 ? incidents : mockIssues;
  }, [incidents]);

  // Filter issues based on search query
  const filteredIssues = useMemo(() => {
    if (!searchQuery.trim()) return baseIssues;
    
    const query = searchQuery.toLowerCase();
    return baseIssues.filter(issue => 
      (issue.id || '').toLowerCase().includes(query) ||
      (issue.title || '').toLowerCase().includes(query) ||
      (issue.region || '').toLowerCase().includes(query) ||
      (issue.type || '').toLowerCase().includes(query) ||
      (issue.status || '').toLowerCase().includes(query)
    );
  }, [baseIssues, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    refetch();
  };

  const handleCreateIncident = async (formData) => {
    try {
      await incidentService.createIncident({
        title: formData.title,
        problem_type: formData.problem_type,
        urgency_level: formData.urgency_level,
        area: formData.area,
        issue_description: formData.issue_description,
        peopleAffected: formData.peopleAffected,
        latitude: formData.latitude,
        longitude: formData.longitude
      });
      
      setSuccessMsg('Incident reported successfully!');
      setIsEditorOpen(false);
      refetch();
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error("Failed to create incident:", err);
    }
  };
  const handleRowClick = (issueId) => {
    // TODO: Navigate to incident detail page or open modal
    alert(`View details for incident ${issueId}`);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
      {/* Success Notification */}
      {successMsg && (
        <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 size={20} />
            <span className="text-sm font-bold">{successMsg}</span>
          </div>
        </div>
      )}

      {/* Editor Modal Overlay */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <IssueEditor 
            onSubmit={handleCreateIncident} 
            onCancel={() => setIsEditorOpen(false)} 
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-display text-white tracking-tight">Incident Explorer</h2>
          <p className="text-zinc-500 text-sm max-w-lg">
            A unified real-time database of all reported incidents, field data, and citizen reports across all active zones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all"
          >
            <FilterX size={16} />
            Reset Filters
          </button>
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center gap-2"
          >
            <Plus size={18} />
            Create Incident
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-[#0A0A0A] border border-[#1A1A1A] p-2.5 rounded-2xl shadow-2xl">
        <div className="flex-1 w-full flex items-center gap-3 bg-[#030303] border border-[#1A1A1A] px-5 py-3 rounded-xl focus-within:border-indigo-500/50 transition-all">
          <Search size={18} className="text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by ID, keyword, or region..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-sm text-zinc-300 focus:outline-none w-full placeholder:text-zinc-700"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
          {['Region', 'Status', 'Type', 'Severity'].map((filter) => (
            <button key={filter} className="bg-[#030303] border border-[#1A1A1A] hover:border-white/10 px-4 py-3 rounded-xl text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap transition-all">
              {filter}
              <ChevronDown size={14} className="opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Issues Table */}
      <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Identifier</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Description</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Geographic Location</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Time</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 relative">
              {loading && (
                <tr className="bg-black/50 backdrop-blur-sm absolute inset-0 z-10 flex items-center justify-center">
                  <td colSpan="6" className="py-20 text-center">
                    <Loader2 className="animate-spin text-indigo-500 mx-auto" size={32} />
                    <p className="text-zinc-500 text-xs font-bold mt-4 uppercase tracking-widest">Updating Incident Database...</p>
                  </td>
                </tr>
              )}
              
              {!loading && filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center">
                    <Search size={40} className="text-zinc-800 mx-auto mb-4" />
                    <p className="text-zinc-400 font-bold">No incidents found matching "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-2 hover:underline"
                    >
                      Clear Search
                    </button>
                  </td>
                </tr>
              )}

              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-white/[0.01] transition-all group cursor-pointer" onClick={() => handleRowClick(issue.id)}>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest px-2 py-1 rounded bg-indigo-500/5 border border-indigo-500/10">{issue.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{issue.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded">{issue.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2.5 text-zinc-400 group-hover:text-white transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                        <MapPin size={14} className="text-zinc-600 group-hover:text-indigo-400" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">{issue.region}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <IssueStatus status={issue.status} />
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-zinc-500 font-medium">
                      <Clock size={12} className="opacity-50" />
                      <span className="text-xs">{issue.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-600 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-4">
             <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
               {loading ? 'Refreshing...' : `Showing ${filteredIssues.length} Incidents`}
             </p>
             <div className="h-4 w-px bg-white/10" />
             <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
               {isLive ? 'Live Sync Active' : 'Offline/Mock Data Mode'}
             </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border border-white/5 text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:bg-white/5 transition-all disabled:opacity-30" disabled={currentPage === 1} onClick={handlePrevPage}>Previous</button>
            <button className="px-4 py-2 rounded-xl border border-white/5 text-[11px] font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all" onClick={handleNextPage}>Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

