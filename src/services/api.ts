import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export default api;
