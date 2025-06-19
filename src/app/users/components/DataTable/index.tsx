"use client";

import React, { memo, useEffect, useMemo } from "react";
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
import { OutUsers } from "@/services/apiServices/Users/Models";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const DataTable = () => {
  const { users: fetchedUsers } = useConsultarUsuarios();
  const { currentUsers, sortConfig, handleSort, setUsers } = useUsersStore();

  const sortedUsers: OutUsers[] = useMemo(() => {
    if (!sortConfig) return currentUsers;

    return [...currentUsers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(String(bValue))
          : String(bValue).localeCompare(aValue);
      }

      return sortConfig.direction === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [currentUsers, sortConfig]);

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
            <TableRow className="hover:bg-muted bg-muted">
              <TableHead>
                Nome
                <Button variant="ghost" onClick={() => handleSort("full_name")}>
                  <ArrowUpDown />
                </Button>
              </TableHead>
              <TableHead>
                Email
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  <ArrowUpDown />
                </Button>
              </TableHead>
              <TableHead>
                Estado
                <Button variant="ghost" onClick={() => handleSort("state")}>
                  <ArrowUpDown />
                </Button>
              </TableHead>
              <TableHead>
                Criado em
                <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                  <ArrowUpDown />
                </Button>
              </TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
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
