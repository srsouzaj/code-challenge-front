import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useUsersContext } from "@/app/users/context/users.context";

const FilterInput = () => {
  const { updateSearchTerm, searchTerm, handleFilter, handleResetFilter } =
    useUsersContext();
  return (
    <>
      <Input
        placeholder="Buscar por nome ou email"
        className="max-w-full"
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
      />
      <Button disabled={!searchTerm} onClick={handleFilter}>
        Filtrar
      </Button>
      <Button
        disabled={!searchTerm}
        variant="ghost"
        onClick={handleResetFilter}
      >
        Limpar
      </Button>
    </>
  );
};

export default memo(FilterInput);
