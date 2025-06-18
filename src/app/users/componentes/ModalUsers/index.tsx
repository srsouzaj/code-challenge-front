import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OutUsers } from "@/services/apiServices/Users/Models";
import { Separator } from "@/components/ui/separator";

const ModalUsers = ({ user }: { user: OutUsers }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger className="text-primary font-medium cursor-pointer">
          {user.full_name}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Sobre o usuário</DialogTitle>
            <DialogDescription>
              Aqui estão as informações cadastradas sobre o usuário
            </DialogDescription>
          </DialogHeader>
          <section className="flex flex-col gap-3 ">
            <h3 className="text-xl text-primary  font-semibold text-center">
              Dados pessoais
            </h3>
            <span className="text-md flex flex-col">
              <b className="text-primary">Nome: </b>
              {user.full_name ?? "Não informado"}
            </span>
            <span className="text-md flex flex-col">
              <b className="text-primary">E-mail: </b>
              {user.email ?? "Não informado"}
            </span>
            <span className="text-md flex flex-col">
              <b className="text-primary">Telefone: </b>
              {user.phone ?? "Não informado"}
            </span>

            <Separator />
            <h3 className="text-xl text-primary font-semibold text-center">
              Logradouro
            </h3>
            <span className="text-md flex flex-col">
              <b className="text-primary">Endereço: </b>
              <p>
                {user.address ?? "Não informado"}, {user.number ?? "N/A"}
              </p>
              <p>
                {user.zip_code} - {user.city ?? "Cidade não informado"} -
                {user.state ?? "Não informado"}
              </p>
            </span>
          </section>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Editar</Button>
            </DialogClose>
            <Button type="submit">Ok</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default memo(ModalUsers);
