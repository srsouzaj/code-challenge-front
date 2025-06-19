import { useUsersStore } from "@/app/store/user.store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, UsersRound } from "lucide-react";
import { memo } from "react";

const Pagination = () => {
  const { currentPage, goToPage, totalPages, currentUsers } = useUsersStore();
  return (
    <div className="flex justify-between p-4 items-center">
      <span className="text-xs flex gap-1 p-2 bg-primary/10 rounded-md font-bold text-primary">
        <UsersRound className="w-4 h-4" />
        {currentUsers.length ?? 0} usuário(s) registrado(s)
      </span>
      <div className="flex items-center gap-4 ">
        <span className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
          Anterior
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default memo(Pagination);
