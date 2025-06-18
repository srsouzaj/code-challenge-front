"use client";
import { useFormStore } from "@/app/register/stores/form.store";
import Services from "@/services";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCriarUsuario = () => {
  const { users: services } = Services();
  const { handleResetForm } = useFormStore();

  const {
    mutate: criarUsuarios,
    isPending: loadingCriarUsuarios,
    isSuccess,
  } = useMutation({
    mutationFn: (users: InUsers) => services.criarUsuarios(users),
    onSuccess: () => {
      handleResetForm();
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
