"use client";
import Services from "@/services";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { APIErrorMessage } from "@/services/apiServices/ApiError";

interface useAtualizarUsuarioInterface {
  userId: number;
  users: InUsers;
}

const useAtualizarUsuario = () => {
  const { users: services } = Services();
  const { push } = useRouter();

  const {
    mutate: atualizarUsuario,
    isPending: loadingAtualizarUsuarios,
    isSuccess,
  } = useMutation({
    mutationFn: ({ userId, users }: useAtualizarUsuarioInterface) =>
      services.atualizarUsuarios(userId, users),
    onSuccess: () => {
      toast("O usuário foi atualizado", {
        description: "Usuário atualizado com sucesso",
      });

      push("/users");
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

      toast.error(message);
    },
  });

  return {
    atualizarUsuario,
    loadingAtualizarUsuarios,
    isSuccess,
  };
};

export default useAtualizarUsuario;
