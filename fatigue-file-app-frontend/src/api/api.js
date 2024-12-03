// src/api/api.js
import axios from "axios";

// Set base URL for the backend server
const API_BASE_URL = "http://localhost:3000/api";

export const uploadFile = (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  return axios.post(`${API_BASE_URL}/files/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getFiles = (userId) => {
  return axios.get(`${API_BASE_URL}/files/${userId}/list`);
};

export const loginUser = (username, password) => {
  return axios.post(`${API_BASE_URL}/users/login`, { username, password });
};
