import axios, { AxiosResponse } from "axios";
import apiRoutes from "../../../../utils/apiRoutes";
import { OutAddress } from "./Models";
import IAddressApiService from "./Types";

export class useAddress implements IAddressApiService {
  async consultarCEP(cep: string): Promise<OutAddress> {
    try {
      const data = await axios.get<void, AxiosResponse<OutAddress>>(
        apiRoutes.address.url(cep)
      );

      return data.data || ({} as OutAddress);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
