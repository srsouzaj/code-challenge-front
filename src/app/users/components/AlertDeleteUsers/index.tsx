import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import useExcluirUsuario from "../../hooks/useExcluirUsuario";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUsersStore } from "@/app/store/user.store";

interface AlertDeleteUsers {
  userId: number;
}

const AlertDeleteUsers = ({ userId }: AlertDeleteUsers) => {
  const { excluirUsuario } = useExcluirUsuario();
  const { handleDeleteUser } = useUsersStore();
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(() => {
    excluirUsuario(userId);

    handleDeleteUser(userId);
    setOpen(false);
  }, [excluirUsuario, userId]);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-red-600"
      >
        <Trash2 className="w-4 h-4" />
        Excluir
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              usuário e removerá os dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDeleteUsers;
