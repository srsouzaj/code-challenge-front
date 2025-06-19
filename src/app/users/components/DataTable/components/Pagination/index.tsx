import { useUsersStore } from "@/app/store/user.store";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const Pagination = () => {
  const { currentPage, goToPage, totalPages } = useUsersStore();
  return (
    <div className="flex justify-end items-center gap-4 p-4">
      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima
      </Button>
    </div>
  );
};

export default memo(Pagination);
