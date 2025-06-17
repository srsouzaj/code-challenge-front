import { OutAddress } from "./Models";

interface IAddressApiService {
  consultarCEP(cep: string): Promise<OutAddress>;
}

export default IAddressApiService;
