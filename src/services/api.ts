import axios, { AxiosError } from "axios";
import { APIErrorMessage } from "./apiServices/ApiError";
import { toast } from "sonner";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const APIMessage =
      (status && APIErrorMessage[status]) ||
      "Ocorreu um erro inesperado. Tente novamente.";
    toast(APIMessage);

    return Promise.reject(new Error(APIMessage));
  }
);

export default api;
