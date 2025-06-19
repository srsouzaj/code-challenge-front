"use client";

import { useFormStore } from "@/app/store/form.store";
import { Button } from "@/components/ui/button";
import React, { memo, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ButtonNavigationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handleBack: () => void;
  children?: ReactNode;
  isLoading?: boolean;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  onSubmit,
  handleBack,
  children,
  isLoading = false,
}) => {
  const { step } = useFormStore();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      aria-live="polite"
      aria-label="Formulário de navegação"
    >
      {children}
      <nav
        aria-label="Navegação do formulário"
        className="flex justify-between"
      >
        <Button
          type="button"
          onClick={handleBack}
          size="sm"
          variant="outline"
          className="font-medium cursor-pointer"
          disabled={step === 0}
          aria-disabled={step === 0}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!isValid || isSubmitting}
          className="font-medium cursor-pointer"
          isLoading={isLoading}
          aria-disabled={!isValid || isSubmitting}
        >
          {step === 2 ? "Finalizar" : "Próximo"}
        </Button>
      </nav>
    </form>
  );
};

export default memo(ButtonNavigation);
