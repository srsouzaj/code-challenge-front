import axios, { AxiosResponse } from "axios";
import apiRoutes from "../../../../utils/apiRoutes";
import { OutAddress } from "./Models";
import IAddressApiService from "./Types";

export class useAddress implements IAddressApiService {
  async consultarCEP(cep: string): Promise<OutAddress & { message?: string }> {
    try {
      const response = await axios.get<
        void,
        AxiosResponse<OutAddress & { erro?: string }>
      >(apiRoutes.address.url(cep));

      const data = response.data;

      if (data.erro === "true") {
        return {
          ...({} as OutAddress),
          message:
            "O CEP informado não foi localizado. Verifique se está correto.",
        };
      }

      return data || ({} as OutAddress);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
