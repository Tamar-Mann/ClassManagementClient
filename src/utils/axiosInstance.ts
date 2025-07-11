// File: src/utils/axiosInstance.ts

import axios from "axios";

const instance = axios.create({
  // // baseURL: "https://localhost:7129", // שימי את כתובת ה־API שלך כאן
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// הוספת Authorization Header אוטומטית אם יש טוקן
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
