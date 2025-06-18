import useServices from "@/services";
import { OutAddress } from "@/services/apiServices/Address/Models";
import { useQuery } from "@tanstack/react-query";

const useConsultarCEP = (cep: string) => {
  const { address } = useServices();

  const isValidCep = /^[0-9]{8}$/.test(cep.replace("-", ""));

  const { data, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["consultar-cep", cep],
    queryFn: () => address.consultarCEP(cep),
    enabled: isValidCep,
    staleTime: 1000 * 60 * 5,
  });

  return {
    address: data ?? ({} as OutAddress),
    isLoadingAddress,
  };
};

export default useConsultarCEP;
