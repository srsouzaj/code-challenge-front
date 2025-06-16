import axios, { AxiosResponse } from "axios";
import apiRoutes from "../../../../utils/apiRoutes";
import { OutAddress } from "./Models";
import IAddressApiService from "./Types";

export class useAddress implements IAddressApiService {
  async consultarCEP(cep: string): Promise<AxiosResponse<OutAddress>> {
    try {
      return await axios.get<void, AxiosResponse<OutAddress>>(
        apiRoutes.address.url(cep)
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
