import { OutUsers } from "@/services/apiServices/Users/Models";
import { create } from "zustand";

interface SortConfig {
  key: keyof OutUsers;
  direction: "asc" | "desc";
}

interface UsersState {
  users: OutUsers[];
  searchTerm: string;
  filteredUsers: OutUsers[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  currentUsers: OutUsers[];
  sortConfig: SortConfig | null;

  setUsers: (users: OutUsers[]) => void;
  updateSearchTerm: (term: string) => void;
  goToPage: (page: number) => void;
  handleFilter: () => void;
  handleResetFilter: () => void;
  handleDeleteUser: (userId: number) => void;
  handleSort: (key: keyof OutUsers) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  searchTerm: "",
  filteredUsers: [],
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,
  currentUsers: [],
  sortConfig: null,

  setUsers: (users) =>
    set((state) => {
      const totalPages = Math.max(
        1,
        Math.ceil(users.length / state.itemsPerPage)
      );
      const currentUsers = users.slice(0, state.itemsPerPage);
      return {
        users,
        filteredUsers: users,
        totalPages,
        currentPage: 1,
        currentUsers,
      };
    }),

  updateSearchTerm: (term) => set({ searchTerm: term }),

  goToPage: (page) =>
    set((state) => {
      const startIndex = (page - 1) * state.itemsPerPage;
      const currentUsers = state.filteredUsers.slice(
        startIndex,
        startIndex + state.itemsPerPage
      );
      return {
        currentPage: page,
        currentUsers,
      };
    }),

  handleFilter: () =>
    set((state) => {
      const term = state.searchTerm.trim().toLowerCase();
      if (!term) {
        const totalPages = Math.max(
          1,
          Math.ceil(state.users.length / state.itemsPerPage)
        );
        const currentUsers = state.users.slice(0, state.itemsPerPage);
        return {
          filteredUsers: state.users,
          currentPage: 1,
          totalPages,
          currentUsers,
        };
      }

      const filtered = state.users.filter((user) =>
        [user.full_name, user.email].some((field) =>
          field.toLowerCase().includes(term)
        )
      );

      const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / state.itemsPerPage)
      );
      const currentUsers = filtered.slice(0, state.itemsPerPage);

      return {
        filteredUsers: filtered,
        currentPage: 1,
        totalPages,
        currentUsers,
      };
    }),

  handleResetFilter: () =>
    set((state) => {
      const totalPages = Math.max(
        1,
        Math.ceil(state.users.length / state.itemsPerPage)
      );
      const currentUsers = state.users.slice(0, state.itemsPerPage);
      return {
        searchTerm: "",
        filteredUsers: state.users,
        currentPage: 1,
        totalPages,
        currentUsers,
      };
    }),

  handleDeleteUser: (userId) =>
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      const updatedFilteredUsers = state.filteredUsers.filter(
        (user) => user.id !== userId
      );

      const newTotalPages = Math.max(
        1,
        Math.ceil(updatedFilteredUsers.length / state.itemsPerPage)
      );
      const newCurrentPage = Math.min(state.currentPage, newTotalPages);
      const startIndex = (newCurrentPage - 1) * state.itemsPerPage;
      const newCurrentUsers = updatedFilteredUsers.slice(
        startIndex,
        startIndex + state.itemsPerPage
      );

      return {
        users: updatedUsers,
        filteredUsers: updatedFilteredUsers,
        totalPages: newTotalPages,
        currentPage: newCurrentPage,
        currentUsers: newCurrentUsers,
      };
    }),

  handleSort: (key) =>
    set((state) => {
      const newDirection =
        state.sortConfig?.key === key && state.sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      return {
        sortConfig: { key, direction: newDirection },
      };
    }),
}));
