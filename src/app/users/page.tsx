"use client";

import { Plus } from "lucide-react";
import DataTable from "./componentes/DataTable";
import { UsersProvider } from "./context/users.context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function UsersPage() {
  return (
    <UsersProvider>
      <main className="container flex flex-col gap-10">
        <section className="flex justify-between">
          <span className="flex flex-col gap-1">
            <h1 className="font-semibold text-2xl text-primary">Usuários</h1>
            <p className="text-xs font-thin">
              Para verificar maiores informações sobre os usuário, clique no
              nome
            </p>
          </span>
          <Link href={"/"}>
            <Button>
              <Plus />
              Cadastrar novo usuário
            </Button>
          </Link>
        </section>
        <DataTable />
      </main>
    </UsersProvider>
  );
}
