import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface FormContextValue {
  step: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
}

const FormContext = createContext<FormContextValue>({} as FormContextValue);

export const FormProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3;

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback(() => {
    if (step > totalSteps) {
      setStep(step + 1);
    }
  }, [step]);

  const value: FormContextValue = useMemo(
    () => ({ handleBack, step, totalSteps, handleNext }),
    [handleBack, step, totalSteps, handleNext]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Erro");
  }
  return context;
};
