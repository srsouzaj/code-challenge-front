import api from "../../api";
import apiRoutes from "../../../../utils/apiRoutes";
import IUsersApiService from "./Types";
import { InUsers, OutUsers } from "./Models";
import { AxiosError } from "axios";
import { APIErrorMessage } from "../ApiError";
export class useUsers implements IUsersApiService {
  async criarUsuarios(user: InUsers): Promise<void> {
    try {
      await api.post(apiRoutes.users.url(), user);
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg =
          e.response?.status && APIErrorMessage[e.response.status]
            ? APIErrorMessage[e.response.status]
            : e.message;
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(e);
    }
  }

  async consultarUsuarios(): Promise<OutUsers[]> {
    try {
      const { data } = await api.get(apiRoutes.users.url());
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg =
          e.response?.status && APIErrorMessage[e.response.status]
            ? APIErrorMessage[e.response.status]
            : e.message;
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(e);
    }
  }

  async consultarUsuarioById(userId: number): Promise<OutUsers> {
    try {
      const { data } = await api.get(apiRoutes.users.byId.url(userId));
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg =
          e.response?.status && APIErrorMessage[e.response.status]
            ? APIErrorMessage[e.response.status]
            : e.message;
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(e);
    }
  }

  async atualizarUsuarios(userId: number, user: InUsers): Promise<void> {
    try {
      await api.put(apiRoutes.users.byId.url(userId), user);
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg =
          e.response?.status && APIErrorMessage[e.response.status]
            ? APIErrorMessage[e.response.status]
            : e.message;
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(e);
    }
  }

  async excluirUsuarios(userId: number): Promise<void> {
    try {
      await api.delete(apiRoutes.users.byId.url(userId));
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg =
          e.response?.status && APIErrorMessage[e.response.status]
            ? APIErrorMessage[e.response.status]
            : e.message;
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(e);
    }
  }
}
