// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

// Interceptor para añadir token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // No redirigir automáticamente
    return Promise.reject(error);
  }
);

export default api;
