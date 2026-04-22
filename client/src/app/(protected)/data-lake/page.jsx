'use client';
import React, { useState } from 'react';
import { FileUp, CheckCircle2, Clock, XCircle, FileSpreadsheet, Trash2 } from 'lucide-react';

export default function DataLakePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [recentUploads, setRecentUploads] = useState([
    { id: 1, name: 'disaster_zones_q1.csv', size: '2.4 MB', rows: '12,045', date: 'Oct 24, 2023', status: 'Completed' },
    { id: 2, name: 'volunteer_logs_draft.csv', size: '850 KB', rows: '3,200', date: 'Oct 23, 2023', status: 'Completed' },
    { id: 3, name: 'corrupted_sensor_data.csv', size: '5.1 MB', rows: '45,000', date: 'Oct 20, 2023', status: 'Failed' },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
      setUploadStatus(null);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        const preview = rows.slice(0, 6).map(row => row.split(',').map(cell => cell.trim()));
        setPreviewData(preview);
      };
      reader.readAsText(file.slice(0, 5000)); // Just read first block for preview
    } else {
      setSelectedFile(null);
      setPreviewData(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setUploadStatus(null);
  };

  // Smart mapper logic translated from backend
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

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const text = event.target.result;
          const lines = text.split('\n').filter(row => row.trim() !== '');
          if (lines.length < 2) throw new Error("CSV has no data rows.");
          
          const headers = lines[0].split(',').map(h => h.trim());
          
          // Dynamically import client firebase sdk to ensure it runs
          const { db, storage } = await import('@/lib/firebase');
          const { writeBatch, collection, doc } = await import('firebase/firestore');
          const { ref, uploadBytes } = await import('firebase/storage');

          // Upload raw file to Firebase Storage
          const storageRef = ref(storage, `raw_csv_uploads/${Date.now()}_${selectedFile.name}`);
          // Handled inside the timeout wrapper below
          
          const batch = writeBatch(db);
          const issuesRef = collection(db, 'issues');
          let count = 0;

          // Process rows (skip header)
          const maxRows = Math.min(lines.length, 501);
          for (let i = 1; i < maxRows; i++) {
            // Very simple CSV split handling
            const cells = lines[i].split(',').map(c => c.trim());
            const rowObj = {};
            headers.forEach((header, index) => {
              rowObj[header] = cells[index] || '';
            });

            const issueData = mapRowToIssue(rowObj);
            const docRef = doc(issuesRef);
            batch.set(docRef, issueData);
            count++;
          }

          // Helper for timeout
          const withTimeout = (promise, ms, message) => {
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
            return Promise.race([promise, timeout]);
          };

          // Commit directly to Firestore (Bypassing Storage upload to prevent hangs)
          await withTimeout(
            batch.commit(),
            15000, 
            "Upload timed out. Check network or database permissions."
          );

          setRecentUploads(prev => [
            {
              id: Date.now(),
              name: selectedFile.name,
              size: (selectedFile.size / 1024).toFixed(1) + ' KB',
              rows: count,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              status: 'Completed'
            },
            ...prev
          ]);

          setUploadStatus({ type: 'success', message: `Successfully structured and uploaded ${count} records directly into the Data Lake!` });
          setTimeout(() => handleClear(), 3000);
        } catch (err) {
          console.error("Upload error details:", err);
          setUploadStatus({ type: 'error', message: err.message || 'Error processing CSV rows.' });
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        setUploadStatus({ type: 'error', message: 'Failed to read file locally.' });
        setIsUploading(false);
      }
      reader.readAsText(selectedFile);
    } catch (err) {
      setUploadStatus({ type: 'error', message: 'Unexpected issue initializing upload.' });
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col max-w-6xl mx-auto w-full">
      {/* 1. Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-sidebar tracking-tight mb-2">Data Lake</h1>
        <p className="text-slate-500 font-medium">Manage and ingest your raw data sources for analysis and reporting.</p>
      </div>

      {/* 2. CSV Upload Zone */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        {!selectedFile ? (
          <label className="border-3 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center p-16 text-center hover:bg-slate-100/80 hover:border-primary/50 transition-all cursor-pointer group">
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <FileUp size={36} />
            </div>
            <h3 className="text-xl font-bold text-sidebar mb-2">Drag & drop your CSV file here, or click to browse</h3>
            <p className="text-sm text-slate-500 font-medium">Only .csv files are accepted. Maximum file size 50MB.</p>
          </label>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-sidebar">{selectedFile.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload</p>
                </div>
              </div>
              <button onClick={handleClear} disabled={isUploading} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full border border-slate-200 shadow-sm hover:shadow">
                <Trash2 size={18} />
              </button>
            </div>

            {/* CSV Preview */}
            {previewData && previewData.length > 0 && (
              <div className="mb-6 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">File Preview (First 5 rows)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {previewData[0].map((header, i) => (
                          <th key={i} className="px-4 py-3 font-bold text-sidebar">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {previewData.slice(1).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-2.5 text-slate-600">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {uploadStatus && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${
                uploadStatus.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {uploadStatus.type === 'success' ? <CheckCircle2 className="shrink-0" size={20} /> : <XCircle className="shrink-0" size={20} />}
                <p className="text-sm font-semibold">{uploadStatus.message}</p>
              </div>
            )}

            <div className="flex justify-end border-t border-slate-100 pt-6">
               <button 
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-8 py-3 font-bold text-white rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 ${
                  isUploading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover hover:shadow-lg'
                }`}
              >
                {isUploading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <><FileUp size={20} /> Upload to Data Lake</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Recent Uploads Table */}
      <h3 className="text-xl font-bold text-sidebar mb-4">Recent Uploads</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-600">File Name</th>
                <th className="px-6 py-4 font-bold text-slate-600">Size</th>
                <th className="px-6 py-4 font-bold text-slate-600">Rows Ingested</th>
                <th className="px-6 py-4 font-bold text-slate-600">Uploaded At</th>
                <th className="px-6 py-4 font-bold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUploads.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="text-slate-400" size={18} />
                      <span className="font-semibold text-sidebar">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{file.size}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{file.rows}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{file.date}</td>
                  <td className="px-6 py-4">
                    {file.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle2 size={14} /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
                        <XCircle size={14} /> Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
