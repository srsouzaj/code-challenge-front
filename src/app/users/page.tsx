"use client";

import TableDataDemo from "./componentes/DataTable";
import useConsultarUsuarios from "./hooks/useConsultarUsuario";

// pages/users/index.tsx
export default function UsersPage() {
  const { users } = useConsultarUsuarios();
  console.log(users);
  return (
    <main className="container">
      <h1>Usuários</h1>
      <TableDataDemo users={users} />
    </main>
  );
}
