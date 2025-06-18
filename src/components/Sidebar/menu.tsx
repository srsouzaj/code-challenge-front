import Link from "next/link";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { UserRoundPlus, Contact, Home } from "lucide-react";

const Menu = () => {
  const items = [
    {
      title: "Página Inicial",
      url: "/",
      icon: Home,
    },
    {
      title: "Usuários",
      url: "/users",
      icon: Contact,
    },
    {
      title: "Cadastrar novo usuário",
      url: "/",
      icon: UserRoundPlus,
    },
  ];
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon width={24} height={24} />
              <span className="font-semibold text-sm text-black">
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default Menu;
