'use client';
import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage, ShieldCheck, Loader2 } from 'lucide-react';
import { uploadService } from '../services/api';

const UploadBox = ({ onUploadComplete }) => {
  // Task 51: UI States -> 'idle', 'dragging', 'validating', 'uploading', 'processing', 'success', 'error'
  const [uiState, setUiState] = useState('idle');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (uiState === 'uploading' || uiState === 'processing') return;

      if (e.type === 'dragenter' || e.type === 'dragover') {
        setUiState('dragging');
      } else if (e.type === 'dragleave') {
        setUiState('idle');
      }
    },
    [uiState]
  );

  // Task 52: Client-side Validation
  const validateFiles = (files) => {
    setUiState('validating');
    setErrorMsg(null);

    if (files.length + selectedFiles.length > 5) {
      setErrorMsg('You can only upload a maximum of 5 files at a time.');
      setUiState('error');
      return [];
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = Array.from(files).filter((file) => {
      if (!validTypes.includes(file.type)) {
        setErrorMsg('Only JPG and PNG files are allowed.');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(`File ${file.name} is too large (max 10MB).`);
        return false;
      }
      return true;
    });

    if (valid.length === 0) {
      setUiState('error');
    } else {
      setUiState('idle');
    }

    return valid;
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (uiState === 'uploading' || uiState === 'processing') return;

      if (e.dataTransfer.files?.length > 0) {
        const validFiles = validateFiles(e.dataTransfer.files);
        if (validFiles.length > 0) {
          setSelectedFiles((prev) => [...prev, ...validFiles].slice(0, 5));
        }
      }
    },
    [selectedFiles, uiState]
  );

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files?.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles].slice(0, 5));
      }
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
    setUiState('idle');
  };

  // Task 55: Connect to API
  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;
    
    setUiState('uploading');
    setErrorMsg(null);
    setProgress(0);

    try {
      const res = await uploadService.uploadFiles(selectedFiles, (progEvent) => {
        const percentCompleted = Math.round((progEvent.loaded * 100) / progEvent.total);
        setProgress(percentCompleted);
      });

      if (res.jobId) {
        setUiState('processing');
        pollJob(res.jobId);
      }
    } catch (err) {
      setUiState('error');
      setErrorMsg(err.message || 'Upload failed');
    }
  };

  const pollJob = async (jobId) => {
    // Basic polling mock
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const statusRes = await uploadService.pollJobStatus(jobId);
        if (statusRes.state === 'completed') {
          clearInterval(interval);
          setUiState('success');
          if (onUploadComplete) onUploadComplete(statusRes.data);
        } else if (statusRes.state === 'failed') {
          clearInterval(interval);
          setUiState('error');
          setErrorMsg('Job processing failed');
        }
      } catch (err) {
        if (attempts > 10) {
          clearInterval(interval);
          setUiState('error');
          setErrorMsg('Polling Timeout');
        }
      }
    }, 3000);
  };

  const isLocked = ['uploading', 'processing', 'success'].includes(uiState);

  const getContainerClassName = () => {
    let baseClass = 'relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out';
    const cursorClass = isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer';
    const stateClass = uiState === 'dragging' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100';
    return `${baseClass} ${cursorClass} ${stateClass}`;
  };

  const renderStatusIcon = () => {
    if (uiState === 'processing') {
      return <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />;
    }
    if (uiState === 'uploading') {
      return <div className="text-primary-500 font-bold text-2xl">{progress}%</div>;
    }
    
    const iconClass = `w-12 h-12 ${uiState === 'dragging' ? 'text-primary-500 scale-110' : 'text-gray-400'}`;
    return <Upload className={iconClass} />;
  };

  const renderStatusText = () => {
    if (uiState === 'dragging') return 'Drop files!';
    if (uiState === 'uploading') return 'Uploading...';
    if (uiState === 'processing') return 'AI is processing...';
    return 'Click or Drag files to upload';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={getContainerClassName()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!isLocked && (
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/jpg"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
          />
        )}
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
          {renderStatusIcon()}
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-700">
              {renderStatusText()}
            </p>
          </div>
        </div>
      </div>

      {uiState === 'error' && errorMsg && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium animate-pulse">
          ⚠️ {errorMsg}
        </div>
      )}
      
      {uiState === 'success' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm font-medium">
          ✅ Upload and Processing Complete!
        </div>
      )}

      {selectedFiles.length > 0 && !['success'].includes(uiState) && (
        <div className="mt-6 space-y-3">
          <ul className="grid gap-3">
            {selectedFiles.map((file, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FileImage size={24} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-800">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                {!isLocked && (
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <X size={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {!isLocked && (
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors shadow-md"
            >
              Submit {selectedFiles.length} File{selectedFiles.length > 1 ? 's' : ''}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadBox;

