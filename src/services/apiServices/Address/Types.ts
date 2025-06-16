import { AxiosResponse } from "axios";
import { OutAddress } from "./Models";

interface IAddressApiService {
  consultarCEP(cep: string): Promise<AxiosResponse<OutAddress>>;
}

export default IAddressApiService;
