import { AxiosResponse } from "axios";
import api from "../../api";
import apiRoutes from "../../../../utils/apiRoutes";
import IUsersApiService from "./Types";
import { InUsers, OutUsers } from "./Models";

export class useUsers implements IUsersApiService {
  async criarUsuarios(user: InUsers): Promise<AxiosResponse<void>> {
    try {
      return await api.post<InUsers, AxiosResponse<void>>(
        apiRoutes.users.url(),
        user
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async consultarUsuarios(): Promise<AxiosResponse<OutUsers[]>> {
    try {
      return await api.get<void, AxiosResponse<OutUsers[]>>(
        apiRoutes.users.url()
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async consultarUsuarioById(userId: string): Promise<AxiosResponse<OutUsers>> {
    try {
      return await api.get<void, AxiosResponse<OutUsers>>(
        apiRoutes.users.byId.url(userId)
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async atualizarUsuarios(
    userId: string,
    user: InUsers
  ): Promise<AxiosResponse<void>> {
    try {
      return await api.put<InUsers, AxiosResponse<void>>(
        apiRoutes.users.byId.url(userId),
        user
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async excluirUsuarios(userId: string): Promise<AxiosResponse<void>> {
    try {
      return await api.delete<void, AxiosResponse<void>>(
        apiRoutes.users.byId.url(userId)
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
