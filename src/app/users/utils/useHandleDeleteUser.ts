// hooks/useHandleDeleteUser.ts
import { OutUsers } from "@/services/apiServices/Users/Models";
import { useCallback } from "react";

export function useHandleDeleteUser(
  setUsers: React.Dispatch<React.SetStateAction<OutUsers[]>>
) {
  return useCallback(
    (userId: number) => {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    },
    [setUsers]
  );
}
