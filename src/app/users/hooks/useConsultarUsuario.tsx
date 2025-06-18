"use client";

import Services from "@/services";
import { OutUsers } from "@/services/apiServices/Users/Models";

import { useQuery } from "@tanstack/react-query";

const useConsultarUsuarios = () => {
  const { users: services } = Services();

  const { data, isLoading: loadingUsers } = useQuery({
    queryKey: ["consultar-usuario"],
    queryFn: () => services.consultarUsuarios(),
  });

  return {
    users: data ?? ([] as OutUsers[]),
    loadingUsers,
  };
};

export default useConsultarUsuarios;
