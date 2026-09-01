import axios from "axios";

// import.meta.env.VITE_API_URL should be set to https://student-performance-analyzer-vz25.onrender.com in production
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
export { API_BASE_URL };
