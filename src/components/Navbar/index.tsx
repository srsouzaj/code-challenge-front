"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { memo } from "react";
import Image from "next/image";
import Logo from "@/app/assets/vectors/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const title = pathname === "/users" ? "Usuários" : "Cadastro";
  return (
    <header
      aria-label="Barra de navegação principal"
      className="lg:py-5 not-lg:py-8 bg-gray-50 shadow-xs"
    >
      <div className="container flex justify-between not-lg:flex-row-reverse items-center">
        <div className="flex gap-3.5 items-center">
          <Link href="/" passHref aria-label="Página inicial">
            <Image src={Logo} alt="Logo do site" width={50} height={50} />
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <SidebarTrigger
            className="lg:hidden"
            aria-label="Abrir menu lateral"
          />
          <h1 tabIndex={0} className="font-bold text-primary text-md">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default memo(Navbar);
