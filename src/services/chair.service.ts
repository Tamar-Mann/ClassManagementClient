
import axios from "../utils/axiosInstance";
import { ChairType } from "../types/chair.types";

export const chairService = {
  getChairsByClass: async (classId: number): Promise<ChairType[]> => {
    const res = await axios.get(`/api/Chair/GetChairsByClass/${classId}`);
    return res.data;
  },

  getById: async (id: number): Promise<ChairType> => {
    const res = await axios.get(`/api/Chair/${id}`);
    return res.data;
  },

  create: async (data: FormData): Promise<ChairType> => {
    const res = await axios.post("/api/Chair", data);
    return res.data;
  },

  update: async (id: number, data: FormData): Promise<ChairType> => {
    const res = await axios.put(`/api/Chair/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<ChairType> => {
    const res = await axios.delete(`/api/Chair/${id}`);
    return res.data;
  },
};
