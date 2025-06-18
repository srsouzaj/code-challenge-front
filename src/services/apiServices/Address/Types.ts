import { OutAddress } from "./Models";
interface IAddressApiService {
  consultarCEP(cep: string): Promise<
    OutAddress & {
      message?: string;
    }
  >;
}

export default IAddressApiService;
