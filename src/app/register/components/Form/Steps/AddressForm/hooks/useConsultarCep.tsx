import useServices from "@/services";
import { OutAddress } from "@/services/apiServices/Address/Models";
import { useQuery } from "@tanstack/react-query";

const useConsultarCEP = (cep: string) => {
  const { address: services } = useServices();

  const isValidCep = /^[0-9]{8}$/.test(cep.replace("-", ""));

  const { data, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["consultar-cep", cep],
    queryFn: () => services.consultarCEP(cep),
    enabled: isValidCep,
    staleTime: 1000 * 60 * 5,
  });

  return {
    address: data ?? ({} as OutAddress),
    isLoadingAddress,
    message: data?.message,
  };
};

export default useConsultarCEP;
