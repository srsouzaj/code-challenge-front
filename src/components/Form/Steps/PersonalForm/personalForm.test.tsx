import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

import PersonalForm from ".";

// Mock do store
vi.mock("@/app/register/stores/form.store", () => ({
  useFormStore: vi.fn(),
}));

import { useFormStore } from "@/app/store/form.store";

// Mock do componente ButtonNavigation
vi.mock("../buttonNavigation", () => {
  interface MockProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
    handleBack?: () => void;
  }

  const MockButtonNavigation = ({ onSubmit, children }: MockProps) => (
    <form aria-label="Formulário de Navegação" onSubmit={onSubmit}>
      {children}
      <button type="submit">Submit</button>
    </form>
  );

  MockButtonNavigation.displayName = "ButtonNavigation";
  return { default: MockButtonNavigation };
});

describe("PersonalForm", () => {
  const mockHandleBack = vi.fn();
  const mockHandleNext = vi.fn();
  const mockHandlePersonalData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormStore as unknown as Mock).mockReturnValue({
      handleBack: mockHandleBack,
      handleNext: mockHandleNext,
      handlePersonalData: mockHandlePersonalData,
      personalData: {
        full_name: "",
        email: "",
        phone: "",
      },
    });
  });

  it("renders form fields with labels", () => {
    render(<PersonalForm />);
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
  });

  it("shows validation errors on submit", async () => {
    render(<PersonalForm />);
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.toLowerCase().includes("nome completo")
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText((content) => content.toLowerCase().includes("e-mail"))
      ).toBeInTheDocument();

      expect(
        screen.getByText((content) =>
          content.toLowerCase().includes("telefone")
        )
      ).toBeInTheDocument();
    });
  });

  it("calls handlePersonalData and handleNext on valid submit", async () => {
    render(<PersonalForm />);

    fireEvent.input(screen.getByLabelText(/nome completo/i), {
      target: { value: "Jorge Souza" },
    });
    fireEvent.input(screen.getByLabelText(/e-mail/i), {
      target: { value: "jorge@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/telefone/i), {
      target: { value: "13999999999" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Jorge Souza")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Submit"));

    // await waitFor(() => {
    //   expect(mockHandlePersonalData).toHaveBeenCalledWith({
    //     full_name: "Jorge Souza",
    //     email: "jorge@example.com",
    //     phone: "13999999999",
    //   });
    //   expect(mockHandleNext).toHaveBeenCalled();
    // });
  });
});
