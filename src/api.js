import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    //console.log("Token sent in request:", token); // Debugging line
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
