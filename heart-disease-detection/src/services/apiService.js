// services/apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getUsers = () => apiService.get("/users/");
export const getUserById = (id) => apiService.get(`/users/${id}/`);
export const createUser = (data) => apiService.post("/users/create/", data);
export const updateUser = (id, data) => apiService.put(`/users/${id}/`, data);
export const deleteUser = (id) => apiService.delete(`/users/${id}/`);

export const getPatients = () => apiService.get("/patients/");
export const getPatientById = (id) => apiService.get(`/patients/${id}/`);
export const createPatient = (data) => apiService.post("/patients/", data);
export const updatePatient = (id, data) => apiService.put(`/patients/${id}/`, data);
export const deletePatient = (id) => apiService.delete(`/patients/${id}/`);

export const getECGPredictions = () => apiService.get("/predictions/");
export const getECGPredictionById = (id) =>
  apiService.get(`/predictions/${id}/`);
export const createECGPrediction = (data) =>
  apiService.post("/predictions/", data);
export const deleteECGPrediction = (id) =>
  apiService.delete(`/predictions/${id}/`);

export const login = (credentials) => apiService.post("/users/login/", credentials);
export const logout = () => apiService.post("/users/logout/");
