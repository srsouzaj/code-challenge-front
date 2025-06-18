"use client";
import Services from "@/services";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  });

  return {
    atualizarUsuario,
    loadingAtualizarUsuarios,
    isSuccess,
  };
};

export default useAtualizarUsuario;
