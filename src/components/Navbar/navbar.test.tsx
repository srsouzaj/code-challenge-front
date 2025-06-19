import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";

import { SidebarProvider } from "../ui/sidebar";
import Navbar from ".";

beforeAll(() => {
  // Mock básico para window.matchMedia no Vitest (Node ambiente)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
});

describe("Navbar component", () => {
  it("renders with aria-labels and text content", () => {
    render(
      <SidebarProvider>
        <Navbar />
      </SidebarProvider>
    );

    // Verifica o link com aria-label "Página inicial"
    const logoLink = screen.getByLabelText(/página inicial/i);
    expect(logoLink).toBeDefined();

    // Verifica o botão do SidebarTrigger (aria-label "Abrir menu lateral")
    const sidebarButton = screen.getByLabelText(/abrir menu lateral/i);
    expect(sidebarButton).toBeDefined();

    // Verifica o título com texto "Cadastros"
    expect(screen.getByText(/cadastros/i)).toBeDefined();
  });
});
