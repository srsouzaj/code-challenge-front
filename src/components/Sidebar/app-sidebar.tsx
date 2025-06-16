import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import User from "./user";
import Menu from "./menu";
import Link from "next/link";
import { LogOut } from "lucide-react";

const SidebarItemsMenu = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <User />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Menu />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link
          className="font-semibold text-sm flex gap-2 pb-2 px-2 text-black"
          href={"/"}
        >
          <LogOut width={16} height={16} />
          Sair
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarItemsMenu;
