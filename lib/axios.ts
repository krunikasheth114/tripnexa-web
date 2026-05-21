import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Attach JWT token from localStorage if present
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('tn_access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
