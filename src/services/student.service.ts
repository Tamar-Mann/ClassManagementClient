// File: src/services/student.service.ts

import axios from "../utils/axiosInstance";
import { StudentType } from "../types/student.types";

export const studentService = {
  getAll: async (): Promise<StudentType[]> => {
    const res = await axios.get("/api/Student");
    return res.data;
  },

  getById: async (id: string): Promise<StudentType> => {
    const res = await axios.get(`/api/Student/${id}`);
    return res.data;
  },

  getAllStudentsOfClass: async (classId: number): Promise<StudentType[]> => {
    const res = await axios.get(`/api/Student/AllStudentsOfClass/${classId}`);
    return res.data;
  },

  create: async (data: FormData): Promise<StudentType> => {
    const res = await axios.post("/api/Student", data);
    return res.data;
  },

  update: async (id: string, data: Partial<StudentType>): Promise<StudentType> => {
    const res = await axios.put(`/api/Student/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<StudentType> => {
    const res = await axios.delete(`/api/Student/${id}`);
    return res.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<string> => {
    const res = await axios.post("/api/Student/login", credentials);
    return res.data;
  },
};
