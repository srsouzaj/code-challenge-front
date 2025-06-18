import { useStepFormContext } from "@/app/register/context/form.context";
import { Button } from "@/components/ui/button";
import { memo, ReactNode } from "react";
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
  const { step } = useStepFormContext();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {children}
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={handleBack}
          size="sm"
          variant={"outline"}
          className="font-medium cursor-pointer"
          disabled={step === 0}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!isValid || isSubmitting}
          className="font-medium cursor-pointer"
          isLoading={isLoading}
        >
          {step === (2 as number) ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </form>
  );
};

export default memo(ButtonNavigation);
