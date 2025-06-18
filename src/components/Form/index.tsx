import { memo } from "react";
import Indicator from "./Indicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormProvider,
  useStepFormContext,
} from "../../app/register/context/form.context";
import { FormStep, stepLabels } from "./Steps/utils/descriptions";
import FormSteps from "./Steps/AnimatedStep/utils/FormStep";

const FormContainer = () => {
  const { step, totalSteps } = useStepFormContext();

  return (
    <FormProvider>
      <div className="space-y-4">
        <Indicator totalSteps={totalSteps} step={step} />
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Etapa {step + 1} de {totalSteps} - Criação de usuários
            </CardTitle>
            <CardDescription>
              {stepLabels[step as keyof typeof stepLabels]}
            </CardDescription>
          </CardHeader>
          <CardContent className=" h-full">
            <FormSteps step={step as FormStep} />
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default memo(FormContainer);
