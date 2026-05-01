import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
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
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));

    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress
    });
  },

  pollJobStatus: async (jobId) => {
    return api.get(`/jobs/${jobId}`);
  }
};

export const analyticsService = {
  getDashboardAnalytics: async () => {
    return api.get('/analytics');
  }
};

export default api;

