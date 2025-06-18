import React from "react";
import AnimatedStep from "..";
import { FormStep } from "../../utils/descriptions";
import PersonalForm from "../../PersonalForm";
import AddressForm from "../../AddressForm";
import ConfirmForm from "../../ConfirmForm";

interface FormStepsProps {
  step: FormStep;
}

const FormSteps: React.FC<FormStepsProps> = ({ step }) => {
  const formSteps: Record<FormStep, React.ReactNode> = {
    [FormStep.Personal]: (
      <AnimatedStep key={FormStep.Personal} active={step === FormStep.Personal}>
        <PersonalForm />
      </AnimatedStep>
    ),
    [FormStep.Address]: (
      <AnimatedStep key={FormStep.Address} active={step === FormStep.Address}>
        <AddressForm />
      </AnimatedStep>
    ),
    [FormStep.Confirm]: (
      <AnimatedStep key={FormStep.Confirm} active={step === FormStep.Confirm}>
        <ConfirmForm />
      </AnimatedStep>
    ),
  };

  return <>{formSteps[step]}</>;
};

export default FormSteps;
