import axios, { AxiosError } from "axios";

import { APIErrorMessage } from "./apiServices/ApiError";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status && APIErrorMessage[status]) {
      return Promise.reject(new Error(APIErrorMessage[status]));
    }

    return Promise.reject(error);
  }
);

export default api;
