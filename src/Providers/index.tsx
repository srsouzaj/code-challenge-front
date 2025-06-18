"use client";

import SidebarItemsMenu from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <SidebarItemsMenu />
        {children}
      </SidebarProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default memo(Providers);
