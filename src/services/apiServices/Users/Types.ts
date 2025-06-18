import { InUsers, OutUsers } from "./Models";

interface IUsersApiService {
  criarUsuarios(user: InUsers): Promise<void>;
  consultarUsuarios(): Promise<OutUsers[]>;
  consultarUsuarioById(userId: string): Promise<OutUsers>;
  atualizarUsuarios(userId: string, user: InUsers): Promise<void>;
  excluirUsuarios(userId: string): Promise<void>;
}

export default IUsersApiService;
