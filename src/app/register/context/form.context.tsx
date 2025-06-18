import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { OutPersonalFormTypes } from "../../../components/Form/Steps/PersonalForm/utils/personalForm.interface";
import { OutAddressFormTypes } from "../../../components/Form/Steps/AddressForm/utils/address.interface";

interface FormContextValue {
  step: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handlePersonalData: (value: OutPersonalFormTypes) => void;
  handleAddressData: (value: OutAddressFormTypes) => void;
  personalData: OutPersonalFormTypes;
  addressData: OutAddressFormTypes;
  handleResetForm: () => void;
}

const FormContext = createContext<FormContextValue>({} as FormContextValue);

export const FormProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3;
  const [personalData, setPersonalData] = useState<OutPersonalFormTypes>(
    {} as OutPersonalFormTypes
  );
  const [addressData, setAddressData] = useState<OutAddressFormTypes>(
    {} as OutAddressFormTypes
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handlePersonalData = useCallback((value: OutPersonalFormTypes) => {
    setPersonalData(value);
  }, []);

  const handleAddressData = useCallback((value: OutAddressFormTypes) => {
    setAddressData(value);
  }, []);

  const handleNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handleResetForm = useCallback(() => {
    console.log("bateu aqui");
    setStep(0);
    setPersonalData({} as OutPersonalFormTypes);
    setAddressData({} as OutAddressFormTypes);
  }, []);

  const value: FormContextValue = useMemo(
    () => ({
      handleBack,
      step,
      totalSteps,
      handleNext,
      addressData,
      handleAddressData,
      handlePersonalData,
      personalData,
      handleResetForm,
    }),
    [
      handleBack,
      step,
      totalSteps,
      handleNext,
      addressData,
      handleAddressData,
      handlePersonalData,
      personalData,
      handleResetForm,
    ]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useStepFormContext = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Erro");
  }
  return context;
};
