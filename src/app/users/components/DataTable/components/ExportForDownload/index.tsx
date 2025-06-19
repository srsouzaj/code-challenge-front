import { useExportData } from "@/app/users/hooks/useExportData";
import { memo } from "react";
import { Download, FileJson, FileJson2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUsersStore } from "@/app/store/user.store";

const ExportForDownload = () => {
  const { exportCSV, exportJSON } = useExportData();
  const { users } = useUsersStore();
  return (
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
  );
};

export default memo(ExportForDownload);
