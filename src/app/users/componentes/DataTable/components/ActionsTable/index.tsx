import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertDeleteUsers from "../../../AlertDeleteUsers";
import { useUsersContext } from "@/app/users/context/users.context";

const ActionsTable = ({ userId }: { userId: number }) => {
  const { handleDeleteUser } = useUsersContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => console.log("Editar", userId)}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" />
          Editar
        </DropdownMenuItem>

        <AlertDeleteUsers handleDeleteUser={handleDeleteUser} userId={userId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(ActionsTable);
