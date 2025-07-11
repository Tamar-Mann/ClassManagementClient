// File: src/utils/axiosInstance.ts

import axios from "axios";

const instance = axios.create({

});

// הוספת Authorization Header אוטומטית אם יש טוקן
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    console.log("token sent in request:", token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default instance;
