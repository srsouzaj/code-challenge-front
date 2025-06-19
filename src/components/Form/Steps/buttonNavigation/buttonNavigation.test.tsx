import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as formStore from "@/app/store/form.store";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import ButtonNavigation from ".";

// Mock do react-hook-form antes dos imports do componente
vi.mock("react-hook-form", () => {
  return {
    useFormContext: () => ({
      handleSubmit:
        (fn: SubmitHandler<FieldValues>) =>
        (e?: React.BaseSyntheticEvent): Promise<unknown> => {
          e?.preventDefault();
          return Promise.resolve(fn({}));
        },
      formState: {
        isValid: true,
        isSubmitting: false,
        errors: {},
        touchedFields: {},
        dirtyFields: {},
        isDirty: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        submitCount: 0,
        isValidating: false,
      },
      register: vi.fn(),
      reset: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn(),
      trigger: vi.fn(),
      control: {},
      clearErrors: vi.fn(),
      setError: vi.fn(),
    }),
  };
});

describe("ButtonNavigation", () => {
  beforeEach(() => {
    vi.spyOn(formStore, "useFormStore").mockReturnValue({ step: 1 });
  });

  it("renders the buttons with correct text and children", () => {
    render(
      <ButtonNavigation onSubmit={() => {}} handleBack={() => {}}>
        <p>Conteúdo extra</p>
      </ButtonNavigation>
    );

    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /próximo/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Conteúdo extra")).toBeInTheDocument();
  });

  it("disables back button on step 0", () => {
    vi.spyOn(formStore, "useFormStore").mockReturnValue({ step: 0 });
    render(<ButtonNavigation onSubmit={() => {}} handleBack={() => {}} />);
    const backButton = screen.getByRole("button", { name: /voltar/i });
    expect(backButton).toBeDisabled();
  });

  it("shows 'Finalizar' button text on last step", () => {
    vi.spyOn(formStore, "useFormStore").mockReturnValue({ step: 2 });
    render(<ButtonNavigation onSubmit={() => {}} handleBack={() => {}} />);
    expect(
      screen.getByRole("button", { name: /finalizar/i })
    ).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", async () => {
    const onSubmit = vi.fn();
    render(<ButtonNavigation onSubmit={onSubmit} handleBack={() => {}} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("calls handleBack when back button is clicked", () => {
    const handleBack = vi.fn();
    render(<ButtonNavigation onSubmit={() => {}} handleBack={handleBack} />);
    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(handleBack).toHaveBeenCalled();
  });
});
