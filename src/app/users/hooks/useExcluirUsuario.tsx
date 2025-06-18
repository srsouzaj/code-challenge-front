"use client";
import Services from "@/services";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useExcluirUsuario = () => {
  const { users: services } = Services();
  const queryClient = new QueryClient();

  const {
    mutate: excluirUsuario,
    isPending: loadingExcluirUsuarios,
    isSuccess,
  } = useMutation({
    mutationFn: (userId: number) => services.excluirUsuarios(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultar-usuario"] });
      toast("Um novo usuário foi excluído", {
        description: "Usuário excluído com sucesso",
      });
    },
  });

  return {
    excluirUsuario,
    loadingExcluirUsuarios,
    isSuccess,
  };
};

export default useExcluirUsuario;
