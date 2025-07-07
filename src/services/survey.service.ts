// File: src/services/survey.service.ts

import axios from "../utils/axiosInstance";
import { SurveyType } from "../types/survey.types";

export const surveyService = {
  getAll: async (): Promise<SurveyType[]> => {
    const res = await axios.get("/api/Survey");
    return res.data;
  },

  getById: async (id: number): Promise<SurveyType> => {
    const res = await axios.get(`/api/Survey/${id}`);
    return res.data;
  },

  create: async (data: FormData): Promise<SurveyType> => {
    const res = await axios.post("/api/Survey", data);
    return res.data;
  },

  update: async (id: number, data: Partial<SurveyType>): Promise<SurveyType> => {
    const res = await axios.put(`/api/Survey/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<SurveyType> => {
    const res = await axios.delete(`/api/Survey/${id}`);
    return res.data;
  },
};
