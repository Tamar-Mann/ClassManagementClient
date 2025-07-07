// File: src/services/teacher.service.ts

import axios from "../utils/axiosInstance";
import { TeacherType } from "../types/teacher.types";

export const teacherService = {
  getAll: async (): Promise<TeacherType[]> => {
    const res = await axios.get("/api/Teacher");
    return res.data;
  },

  getById: async (id: string): Promise<TeacherType> => {
    const res = await axios.get(`/api/Teacher/${id}`);
    return res.data;
  },

  create: async (data: FormData): Promise<TeacherType> => {
    const res = await axios.post("/api/Teacher", data);
    return res.data;
  },

  update: async (id: string, data: Partial<TeacherType>): Promise<TeacherType> => {
    const res = await axios.put(`/api/Teacher/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<TeacherType> => {
    const res = await axios.delete(`/api/Teacher/${id}`);
    return res.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<string> => {
    const res = await axios.post("/api/Teacher/login", credentials);
    return res.data;
  },
};