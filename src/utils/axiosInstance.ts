// File: src/utils/axiosInstance.ts

import axios from "axios";

const instance = axios.create({
  // baseURL: "https://localhost:7129", // שימי את כתובת ה־API שלך כאן
});

// הוספת Authorization Header אוטומטית אם יש טוקן
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token sent in request:", token); // כאן תראי את הטוקן בכל קריאה
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
