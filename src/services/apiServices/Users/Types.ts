import { AxiosResponse } from "axios";
import { InUsers, OutUsers } from "./Models";

interface IUsersApiService {
  criarUsuarios(user: InUsers): Promise<AxiosResponse<void>>;
  consultarUsuarios(): Promise<AxiosResponse<OutUsers[]>>;
  consultarUsuarioById(userId: string): Promise<AxiosResponse<OutUsers>>;
  atualizarUsuarios(
    userId: string,
    user: InUsers
  ): Promise<AxiosResponse<void>>;
  excluirUsuarios(userId: string): Promise<AxiosResponse<void>>;
}

export default IUsersApiService;
