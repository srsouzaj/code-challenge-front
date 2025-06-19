"use client";

import { useFormStore } from "@/app/store/form.store";
import Services from "@/services";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { APIErrorMessage } from "@/services/apiServices/ApiError";

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
    onError: (error) => {
      let message = "Ocorreu um erro inesperado.";

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status && APIErrorMessage[status]) {
          message = APIErrorMessage[status];
        } else {
          message = error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message, {
        description: "Atualize os dados e tente novamente",
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
