"use client";
import { useStepFormContext } from "@/app/register/context/form.context";
import useServices from "@/services";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCriarUsuario = () => {
  const { users: services } = useServices();
  const { handleResetForm } = useStepFormContext();

  const {
    mutate: criarUsuarios,
    isPending: loadingCriarUsuarios,
    isSuccess,
  } = useMutation({
    mutationFn: (users: InUsers) => services.criarUsuarios(users),
    onSuccess: () => {
      handleResetForm();
      //   queryClient.invalidateQueries({ queryKey: ["consultar-documentos"] });
      toast("Um novo usuário foi adicionado", {
        description: "Usuário adicionado com sucesso",
      });
    },
  });

  return {
    criarUsuarios,
    loadingCriarUsuarios,
    isSuccess,
  };
};

export default useCriarUsuario;
