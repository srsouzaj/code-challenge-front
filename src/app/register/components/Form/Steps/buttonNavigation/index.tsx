import { useStepFormContext } from "@/app/register/context/form.context";
import { Button } from "@/components/ui/button";
import { memo, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ButtonNavigationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handleBack: () => void;
  children?: ReactNode;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  onSubmit,
  handleBack,
  children,
}) => {
  const { step } = useStepFormContext();
  const {
    handleSubmit,
    formState: { isValid },
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
          className="font-medium"
          disabled={step === 0}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!isValid}
          className="font-medium"
        >
          {step === (2 as number) ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </form>
  );
};

export default memo(ButtonNavigation);
