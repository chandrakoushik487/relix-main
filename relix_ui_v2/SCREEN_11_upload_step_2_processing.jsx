import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  Loader2, 
  Database, 
  BrainCircuit, 
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';
import './relix_v2.css';

const UploadStep2V2 = () => {
  return (
    <LayoutWrapper activeTab="Explorer">
      <div className="max-w-4xl mx-auto space-y-10 py-6">
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
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse">2</div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Process</span>
          </div>
          <div className="w-16 h-[2px] bg-[#1A1A1A] mt-[-20px]" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-500 font-bold text-sm">3</div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verify</span>
          </div>
        </div>

        {/* Main Processing Card */}
        <div className="glass-panel p-12 text-center space-y-8 relative overflow-hidden bg-[#050505]">
          {/* Subtle Background Animation Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer" />
          
          <div className="relative">
            <div className="w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto relative">
              <Loader2 size={40} className="text-indigo-500 animate-spin" />
              <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-[spin_3s_linear_infinite]" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-display text-white">Analyzing disaster_zones_q1.csv</h2>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">
              Extracting 12,045 records and applying AI mapping logic to resolve schema conflicts.
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[65%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              <span>Parsing Rows</span>
              <span className="text-indigo-400">65% Complete</span>
            </div>
          </div>

          {/* Task Checklist */}
          <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto text-left mt-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-xs font-medium text-zinc-300">File integrity verified</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-xs font-medium text-zinc-300">Headers detected: 14 columns found</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Loader2 size={16} className="text-indigo-500 animate-spin" />
              <span className="text-xs font-bold text-indigo-300">Mapping headers to Relix Schema...</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl opacity-30">
              <div className="w-4 h-4 rounded-full border border-zinc-500" />
              <span className="text-xs font-medium text-zinc-500">Preparing preview table</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-center gap-4 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
          <BrainCircuit className="text-amber-500 shrink-0" size={24} />
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-amber-500 block mb-1">AI Insight</strong>
            We've detected that "Locality" in your file likely matches our "Region" schema. We are automatically merging these fields for consistency.
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UploadStep2V2;
