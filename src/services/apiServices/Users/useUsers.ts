import api from "../../api";
import apiRoutes from "../../../../utils/apiRoutes";
import IUsersApiService from "./Types";
import { InUsers, OutUsers } from "./Models";

export class useUsers implements IUsersApiService {
  async criarUsuarios(user: InUsers): Promise<void> {
    try {
      await api.post(apiRoutes.users.url(), user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async consultarUsuarios(): Promise<OutUsers[]> {
    try {
      const { data } = await api.get(apiRoutes.users.url());
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async consultarUsuarioById(userId: number): Promise<OutUsers> {
    try {
      const { data } = await api.get(apiRoutes.users.byId.url(userId));
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async atualizarUsuarios(userId: number, user: InUsers): Promise<void> {
    try {
      await api.put(apiRoutes.users.byId.url(userId), user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async excluirUsuarios(userId: number): Promise<void> {
    try {
      await api.delete(apiRoutes.users.byId.url(userId));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
