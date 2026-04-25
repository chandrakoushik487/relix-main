import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Trash2, 
  RotateCcw,
  Search,
  ChevronRight,
  Database
} from 'lucide-react';
import './relix_v2.css';

const UploadStep3V2 = () => {
  const previewRows = [
    { id: 1, type: 'Health', urgency: 'Critical', region: 'District 9', description: 'Severe Water Contamination', mapping: 'Auto', status: 'valid' },
    { id: 2, type: 'Natural Disaster', urgency: 'Critical', region: 'District 9', description: 'Flash Flood Warning', mapping: 'Manual', status: 'valid' },
    { id: 3, type: 'Unknown', urgency: 'Medium', region: 'Sector 4', description: 'Supply Shortage', mapping: 'AI Suggest', status: 'warning' },
    { id: 4, type: 'Logistics', urgency: 'High', region: 'Central Shelter', description: 'Medical Supply Depletion', mapping: 'Auto', status: 'valid' },
    { id: 5, type: 'Infrastructure', urgency: 'Low', region: 'Unknown', description: 'Broken pipe near well', mapping: 'Missing', status: 'error' },
  ];

  return (
    <LayoutWrapper activeTab="Explorer">
      <div className="space-y-8">
        {/* Progress Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Upload</span>
          </div>
          <div className="w-16 h-[2px] bg-emerald-500/30 mt-[-20px]" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Process</span>
          </div>
          <div className="w-16 h-[2px] bg-emerald-500/30 mt-[-20px]" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)]">3</div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Verify</span>
          </div>
        </div>

        {/* Content Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-display text-white">Review & Verify</h2>
            <p className="text-zinc-500 text-sm">Review AI-mapped data before final ingestion into the Data Lake.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all">
              <RotateCcw size={14} />
              Reset Mapping
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Database size={18} />
              Finalize Ingestion
            </button>
          </div>
        </div>

        {/* Preview Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">
                12,045 Records Found
              </span>
              <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">
                2 Errors Detected
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#030303] border border-white/5 px-3 py-1.5 rounded-lg">
              <Search size={14} className="text-zinc-500" />
              <input type="text" placeholder="Search rows..." className="bg-transparent border-none text-[11px] text-zinc-400 focus:outline-none w-48" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.01] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Problem Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Urgency</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Region</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Mapping</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {previewRows.map((row) => (
                  <tr key={row.id} className={`hover:bg-white/[0.01] transition-colors group ${row.status === 'error' ? 'bg-red-500/[0.02]' : ''}`}>
                    <td className="px-6 py-4">
                      {row.status === 'valid' && <CheckCircle2 size={16} className="text-emerald-500" />}
                      {row.status === 'warning' && <AlertCircle size={16} className="text-amber-500" />}
                      {row.status === 'error' && <AlertCircle size={16} className="text-red-500" />}
                    </td>
                    <td className="px-6 py-4">
                      <select className={`bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer ${row.type === 'Unknown' ? 'text-zinc-500 italic' : 'text-zinc-300'}`}>
                        <option>{row.type}</option>
                        <option>Health</option>
                        <option>Natural Disaster</option>
                        <option>Logistics</option>
                        <option>Infrastructure</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select className="bg-transparent border-none text-xs font-bold text-zinc-300 focus:outline-none cursor-pointer">
                        <option>{row.urgency}</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input type="text" defaultValue={row.region} className={`bg-transparent border-none text-xs font-medium focus:outline-none w-24 ${row.region === 'Unknown' ? 'text-red-400' : 'text-zinc-400'}`} />
                    </td>
                    <td className="px-6 py-4">
                      <input type="text" defaultValue={row.description} className="bg-transparent border-none text-xs font-medium text-zinc-400 focus:outline-none w-full min-w-[200px]" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        row.mapping === 'Auto' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        row.mapping === 'AI Suggest' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                      }`}>
                        {row.mapping}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <Save size={14} />
                        </button>
                        <button className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-center">
            <button className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all">
              Load 50 More Rows
            </button>
          </div>
        </div>

        {/* Warning Toast */}
        <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-red-400" />
            <p className="text-sm font-medium text-red-200">
              Row #5 is missing mandatory "Region" data. Please correct it before final ingestion.
            </p>
          </div>
          <button className="text-xs font-bold text-red-400 hover:underline">Scroll to error</button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UploadStep3V2;
