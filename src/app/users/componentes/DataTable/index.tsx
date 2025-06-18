"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { OutUsers } from "@/services/apiServices/Users/Models";
import {
  Download,
  FileJson,
  FileJson2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useExportData } from "../../hooks/useExportData";

export default function TableDataDemo({ users }: { users: OutUsers[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<OutUsers[]>(users);
  const [currentPage, setCurrentPage] = useState(1);
  const { exportCSV, exportJSON } = useExportData();
  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilter = () => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }

    const filtered = users.filter((user) =>
      [user.full_name, user.email].some((field) =>
        field.toLowerCase().includes(term)
      )
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar por nome ou email"
          className="max-w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleFilter}>Filtrar</Button>
        <Button variant="ghost" onClick={handleResetFilter}>
          Limpar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => exportCSV(users)}>
              <FileJson2 />
              Exportar CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportJSON(users)}>
              <FileJson />
              Exportar JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => console.log("Editar", user.id)}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => console.log("Excluir", user.id)}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

        <div className="flex justify-end items-center gap-4 p-4">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
