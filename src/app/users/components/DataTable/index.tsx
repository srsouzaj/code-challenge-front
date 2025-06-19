"use client";

import React, { memo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ActionsTable from "./components/ActionsTable";
import Pagination from "./components/Pagination";
import FilterInput from "./components/FilterInput";
import ExportForDownload from "./components/ExportForDownload";
import ModalUsers from "../ModalUsers";
import { useUsersStore } from "../../../store/user.store";
import useConsultarUsuarios from "../../hooks/useConsultarUsuario";

const DataTable = () => {
  const { currentUsers, setUsers, users } = useUsersStore();

  const { users: fetchedUsers } = useConsultarUsuarios();
  console.log(users);

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <FilterInput />
        <ExportForDownload />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <ModalUsers user={user} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <ActionsTable userId={user.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination />
      </div>
    </div>
  );
};

export default memo(DataTable);
