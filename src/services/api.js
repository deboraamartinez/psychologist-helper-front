import axios from "axios";

const api = axios.create({
  baseURL: "https://psychologist-helper-production.up.railway.app",
});


export const signup = (data) => api.post("/auth/signup", data);

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  if (response.data?.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  return response;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchPatients = () => api.get("/patients");
export const createPatient = (data) => api.post("/patients", data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);
export const fetchPatientDetails = (id) => api.get(`/patients/${id}`);

export const fetchSessions = () => api.get("/sessions");

export const createSession = (data) => api.post("/sessions", data);

export default api;
