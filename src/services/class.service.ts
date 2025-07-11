import axios from "../utils/axiosInstance";
import { ClassType } from "../types/class.types";

export const classService = {
  getAll: async (): Promise<ClassType[]> => {
    const res = await axios.get("/api/Class");
    return res.data;
  },

  getById: async (id: number): Promise<ClassType> => {
    const res = await axios.get(`/api/Class/${id}`);
    return res.data;
  },

  getByTeacherId: async (teacherId: string): Promise<ClassType[]> => {
  const res = await axios.get(`/api/Class/GetClassesByTeacher/${teacherId}`);
  return res.data;
  },

  create: async (data: FormData): Promise<ClassType> => {
    const res = await axios.post("/api/Class", data);
    return res.data;
  },

  update: async (id: number, data: Partial<ClassType>): Promise<ClassType> => {
    const res = await axios.put(`/api/Class/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<ClassType> => {
    const res = await axios.delete(`/api/Class/${id}`);
    return res.data;
  },

  solveSeating: async (classId: number): Promise<void> => {
    await axios.get(`/api/Class/SolverInlayStudentsInSeats/${classId}`);
  },
};


