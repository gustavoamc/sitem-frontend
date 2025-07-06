import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//this replaces the need the header.auuthorization in every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // same as logout, but without react hooks
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // E forçar redirecionamento:
      window.location.href = "/";  // ou window.location.reload()
    }
    return Promise.reject(error);
  }
);

export default api;
