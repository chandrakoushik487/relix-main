import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor for robust error handling (Task 54)
api.interceptors.response.use(
  (response) => {
    // If our backend standardized JSON returns success: false, throw it
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.error || 'API Error'));
    }
    return response.data;
  },
  (error) => {
    let customError = 'An unexpected network error occurred';
    if (error.response) {
      customError = error.response.data?.error?.message || error.response.data?.error || `Server Error: ${error.response.status}`;
    } else if (error.request) {
      customError = 'No response from server. Please check your network connection.';
    }
    return Promise.reject(new Error(customError));
  }
);

// Task 53: Mock / Actual API bridging
export const uploadService = {
  uploadFiles: async (files, onUploadProgress) => {
    const uploadedFiles = [];
    
    // Process one file at a time for simplicity, but could be done with Promise.all
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // 1. Get Signed URL from Backend
      const { url, fileName } = await api.post('/upload/signed-url', {
        fileName: file.name,
        contentType: file.type
      });

      // 2. Upload directly to Google Cloud Storage using PUT
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progEvent) => {
          // Send progress updates back to component
          if (onUploadProgress) {
            // Aggregate progress across files (rough estimation)
            const currentTotal = (i * 100) + Math.round((progEvent.loaded * 100) / progEvent.total);
            const overallPercent = Math.round(currentTotal / files.length);
            onUploadProgress({ loaded: overallPercent, total: 100 });
          }
        }
      });
      
      uploadedFiles.push(fileName);
    }

    return { success: true, uploadedFiles };
  }
};

export const analyticsService = {
  getDashboardAnalytics: async () => {
    return api.get('/analytics');
  }
};

export default api;

