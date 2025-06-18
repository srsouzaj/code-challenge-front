import { InUsers, OutUsers } from "./Models";

interface IUsersApiService {
  criarUsuarios(user: InUsers): Promise<void>;
  consultarUsuarios(): Promise<OutUsers[]>;
  consultarUsuarioById(userId: number): Promise<OutUsers>;
  atualizarUsuarios(userId: number, user: InUsers): Promise<void>;
  excluirUsuarios(userId: number): Promise<void>;
}

export default IUsersApiService;
