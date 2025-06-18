"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useConsultarUsuarios from "../hooks/useConsultarUsuario";
import { OutUsers } from "@/services/apiServices/Users/Models";

interface UsersContextValue {
  searchTerm: string;
  filteredUsers: OutUsers[];
  currentPage: number;
  totalPages: number;
  currentUsers: OutUsers[];
  updateSearchTerm: (term: string) => void;
  goToPage: (page: number) => void;
  handleFilter: () => void;
  handleResetFilter: () => void;
  handleDeleteUser: (userId: number) => void;
  users: OutUsers[];
}

const UsersContext = createContext<UsersContextValue>({} as UsersContextValue);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const { users } = useConsultarUsuarios();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<OutUsers[]>(users);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredUsers((prev) => {
      const sameLength = prev.length === users.length;
      const sameContent =
        sameLength && prev.every((u, i) => u.id === users[i].id);
      return sameContent ? prev : users;
    });
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

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilter = useCallback(() => {
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
  }, [searchTerm, users]);

  const handleResetFilter = useCallback(() => {
    setSearchTerm("");
    setFilteredUsers(users);
    setCurrentPage(1);
  }, [users]);

  const handleDeleteUser = useCallback((userId: number) => {
    setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  const value = useMemo(
    () => ({
      searchTerm,
      filteredUsers,
      currentPage,
      totalPages,
      currentUsers,
      updateSearchTerm,
      goToPage,
      handleFilter,
      handleResetFilter,
      handleDeleteUser,
      users,
    }),
    [
      searchTerm,
      filteredUsers,
      currentPage,
      totalPages,
      currentUsers,
      updateSearchTerm,
      goToPage,
      handleFilter,
      handleResetFilter,
      handleDeleteUser,
      users,
    ]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsersContext = (): UsersContextValue => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext deve ser usado dentro de <UsersProvider>");
  }
  return context;
};
