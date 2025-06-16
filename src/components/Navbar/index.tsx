import { SidebarTrigger } from "../ui/sidebar";
import { memo } from "react";
import Image from "next/image";
import Logo from "@/app/assets/vectors/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="lg:py-5 not-lg:py-8 bg-gray-50 shadow-xs">
      <section className="container flex justify-between">
        <aside className="flex gap-3.5 items-center">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" width={50} height={50} />
          </Link>
        </aside>
        <aside className="flex gap-1 items-center">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="font-bold text-primary text-md">Cadastros</h1>
        </aside>
      </section>
    </nav>
  );
};
export default memo(Navbar);
