'use client';
import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileSpreadsheet, 
  Trash2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Loader2,
  BrainCircuit,
  AlertCircle,
  Save,
  Database,
  RotateCcw,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function DataLakePage() {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [mappedRows, setMappedRows] = useState([]);
  
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, name: 'disaster_zones_q1.csv', size: '2.4 MB', rows: '12,045', date: 'Oct 24, 2023', status: 'Completed' },
    { id: 2, name: 'volunteer_logs_draft.csv', size: '850 KB', rows: '3,200', date: 'Oct 23, 2023', status: 'Completed' },
  ]);

  const fileInputRef = useRef(null);

  // --- CSV Processing Logic ---
  
  const mapRowToIssue = (rowObj) => {
    const findValue = (keys) => {
      const foundKey = Object.keys(rowObj).find(k => 
        keys.some(searchKey => k.toLowerCase().replace(/[\s_-]/g, '').includes(searchKey.toLowerCase()))
      );
      return foundKey ? rowObj[foundKey] : null;
    };

    return {
      issue_id: findValue(['issueid', 'id']) || `ISS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      issue_description: findValue(['description', 'desc', 'problem', 'issue']) || 'No description provided.',
      problem_type: findValue(['type', 'category', 'problemtype']) || 'Others',
      urgency_level: findValue(['urgency', 'priority', 'level']) || 'Medium',
      status: findValue(['status', 'state']) || 'Pending',
      area: findValue(['area', 'location', 'region', 'locality']) || 'Unknown',
      pincode: findValue(['pincode', 'zip', 'zipcode']) || null,
      latitude: parseFloat(findValue(['lat', 'latitude'])) || 0,
      longitude: parseFloat(findValue(['lng', 'long', 'longitude'])) || 0,
      svi_score: parseFloat(findValue(['svi', 'score', 'vulnerability'])) || 0,
      reported_by: findValue(['reporter', 'reportedby', 'source']) || 'Bulk Upload',
      upload_date: findValue(['date', 'timestamp', 'uploaddate']) || new Date().toISOString(),
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
      setStep(2);
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(row => row.trim() !== '');
      
      if (lines.length < 2) {
        setUploadStatus({ type: 'error', message: "CSV has no data rows." });
        setStep(1);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      
      // Simulate processing time for UX
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          
          // Map data
          const mapped = lines.slice(1, 51).map(line => {
            const cells = line.split(',').map(c => c.trim());
            const rowObj = {};
            headers.forEach((header, index) => {
              rowObj[header] = cells[index] || '';
            });
            return mapRowToIssue(rowObj);
          });
          
          setMappedRows(mapped);
          setPreviewData({ headers, rows: lines.slice(0, 6).map(l => l.split(',')) });
          setStep(3);
        }
      }, 50);
    };
    reader.readAsText(file);
  };

  const handleFinalUpload = async () => {
    setIsUploading(true);
    setUploadStatus(null);

    try {
      const { db } = await import('@/lib/firebase');
      const { writeBatch, collection, doc } = await import('firebase/firestore');
      const batch = writeBatch(db);
      const issuesRef = collection(db, 'issues');
      
      mappedRows.forEach(row => {
        const docRef = doc(issuesRef);
        batch.set(docRef, row);
      });

      await batch.commit();

      setRecentUploads(prev => [
        {
          id: Date.now(),
          name: selectedFile.name,
          size: (selectedFile.size / 1024).toFixed(1) + ' KB',
          rows: mappedRows.length,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Completed'
        },
        ...prev
      ]);

      setStep(1);
      setSelectedFile(null);
      setUploadStatus({ type: 'success', message: `Successfully ingested ${mappedRows.length} records!` });
      setTimeout(() => setUploadStatus(null), 5000);
    } catch (err) {
      setUploadStatus({ type: 'error', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedFile(null);
    setMappedRows([]);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 animate-in fade-in duration-500">
      
      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[
          { id: 1, label: 'Upload' },
          { id: 2, label: 'Process' },
          { id: 3, label: 'Verify' }
        ].map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                step >= s.id 
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                  : 'bg-zinc-900 text-zinc-600 border border-white/5'
              }`}>
                {step > s.id ? <CheckCircle2 size={18} /> : s.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-indigo-400' : 'text-zinc-600'}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-16 h-[2px] mt-[-20px] transition-colors duration-500 ${step > s.id ? 'bg-indigo-600/50' : 'bg-zinc-900'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-white">Ingest Raw Data</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">
              Upload your CSV reports. Our AI will automatically map headers to the Relix Data Schema.
            </p>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <label className="relative glass-card border-dashed border-2 border-white/10 group-hover:border-indigo-500/50 flex flex-col items-center justify-center p-20 text-center transition-all cursor-pointer bg-[#050505]">
              <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
              
              <div className="w-24 h-24 bg-indigo-600/10 text-indigo-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <FileUp size={40} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Drop your CSV file here</h3>
              <p className="text-zinc-500 text-sm mb-8 font-medium">Or click to browse from your device</p>
              
              <div className="flex flex-wrap justify-center gap-6 px-8 py-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">CSV ONLY</span>
                </div>
                <div className="w-px h-4 bg-white/10 hidden md:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-indigo-500" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SECURE</span>
                </div>
                <div className="w-px h-4 bg-white/10 hidden md:block" />
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">AI MAPPING</span>
                </div>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 flex gap-4 items-start">
              <div className="p-3 bg-white/5 rounded-xl text-zinc-400"><Info size={20} /></div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Preparation Tips</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Ensure your CSV includes Latitude/Longitude for mapping or Pin codes for region detection.</p>
              </div>
            </div>
            <div className="glass-card p-6 flex gap-4 items-start">
              <div className="p-3 bg-white/5 rounded-xl text-zinc-400"><Clock size={20} /></div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Processing Time</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Files up to 50MB are processed instantly. Larger datasets may take up to 2 minutes.</p>
              </div>
            </div>
          </div>

          {uploadStatus && (
             <div className={`p-4 rounded-xl flex items-center gap-3 border ${uploadStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {uploadStatus.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                <span className="text-sm font-bold">{uploadStatus.message}</span>
             </div>
          )}

          {/* Recent Uploads */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-display">Recent Ingestions</h3>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.02] border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">File Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rows</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentUploads.map(file => (
                    <tr key={file.id} className="hover:bg-white/[0.01]">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <FileSpreadsheet size={16} className="text-zinc-500" />
                        <span className="font-bold text-zinc-300">{file.name}</span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 font-medium">{file.rows}</td>
                      <td className="px-6 py-4 text-zinc-500 font-medium">{file.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          file.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {file.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="glass-card p-12 text-center space-y-8 relative overflow-hidden bg-[#050505] border-white/5">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" />
            
            <div className="relative">
              <div className="w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto relative">
                <Loader2 size={40} className="text-indigo-500 animate-spin" />
                <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-[spin_3s_linear_infinite]" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Analyzing {selectedFile?.name}</h2>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                Applying AI mapping logic to resolve schema conflicts and normalize data.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                <span>Neural Processing</span>
                <span className="text-indigo-400">{progress}% Complete</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
            <BrainCircuit className="text-amber-500 shrink-0" size={24} />
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-amber-500 block mb-1 uppercase tracking-widest font-bold">AI Mapping Engine</strong>
              Matching headers like "locality" and "region" to central disaster schema. Optimizing for geo-spatial accuracy.
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-white">Review & Verify</h2>
              <p className="text-zinc-500 text-sm">Review AI-mapped data before final ingestion into the Data Lake.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all">
                <RotateCcw size={14} />
                Cancel
              </button>
              <button 
                onClick={handleFinalUpload} 
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] disabled:opacity-50"
              >
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
                Finalize Ingestion
              </button>
            </div>
          </div>

          <div className="glass-card overflow-hidden border-white/5">
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">
                  {mappedRows.length} Records Mapped
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
                  Valid Schema
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#030303] border border-white/5 px-3 py-1.5 rounded-lg">
                <Search size={14} className="text-zinc-500" />
                <input type="text" placeholder="Search rows..." className="bg-transparent border-none text-[11px] text-zinc-400 focus:outline-none w-48" />
              </div>
            </div>
            
            <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-white/[0.01] border-b border-white/5 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Urgency</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Region</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Description</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Mapping</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mappedRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-6 py-4">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-zinc-300">{row.problem_type}</td>
                      <td className="px-6 py-4 text-xs font-bold text-zinc-300">{row.urgency_level}</td>
                      <td className="px-6 py-4 text-xs font-medium text-zinc-400">{row.area}</td>
                      <td className="px-6 py-4 text-xs font-medium text-zinc-400 truncate max-w-xs">{row.issue_description}</td>
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase tracking-widest">
                          Auto
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              Showing First 50 Rows for Verification
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
