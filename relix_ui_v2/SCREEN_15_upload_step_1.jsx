import React from 'react';
import LayoutWrapper from './LayoutWrapper';
import { 
  FileUp, 
  Info, 
  FileSpreadsheet, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import './relix_v2.css';

const UploadStep1V2 = () => {
  return (
    <LayoutWrapper activeTab="Explorer">
      <div className="max-w-4xl mx-auto space-y-10 py-6">
        {/* Progress Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)]">1</div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Upload</span>
          </div>
          <div className="w-16 h-[2px] bg-[#1A1A1A] mt-[-20px]" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-500 font-bold text-sm">2</div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Process</span>
          </div>
          <div className="w-16 h-[2px] bg-[#1A1A1A] mt-[-20px]" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-500 font-bold text-sm">3</div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verify</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold font-display text-white">Ingest Raw Data</h2>
          <p className="text-zinc-500 text-base max-w-lg mx-auto">
            Upload your CSV reports. Our AI will automatically map headers to the Relix Data Schema.
          </p>
        </div>

        {/* Dropzone */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <label className="relative glass-panel border-dashed border-2 border-white/10 group-hover:border-indigo-500/50 flex flex-col items-center justify-center p-20 text-center transition-all cursor-pointer bg-[#050505]">
            <input type="file" accept=".csv" className="hidden" />
            
            <div className="w-24 h-24 bg-indigo-600/10 text-indigo-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-xl">
              <FileUp size={40} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">Drop your CSV file here</h3>
            <p className="text-zinc-500 text-sm mb-8 font-medium">Or click to browse from your device</p>
            
            <div className="flex items-center gap-6 px-8 py-4 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-emerald-500" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">CSV ONLY</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-indigo-500" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SECURE</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">AI MAPPING</span>
              </div>
            </div>
          </label>
        </div>

        {/* Guidelines */}
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-card p-6 flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
              <Info size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Preparation Tips</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">Ensure your CSV includes Latitude/Longitude for mapping or Pin codes for region detection.</p>
            </div>
          </div>
          <div className="glass-card p-6 flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Processing Time</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">Files up to 50MB are processed instantly. Larger datasets may take up to 2 minutes.</p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-widest">Need a template?</span>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline transition-colors">Download Sample CSV</button>
          </div>
          <button disabled className="bg-zinc-800 text-zinc-500 px-8 py-3 rounded-xl text-sm font-bold cursor-not-allowed flex items-center gap-2">
            Continue to Processing
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UploadStep1V2;
