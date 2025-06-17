import { memo } from "react";
import Indicator from "./Indicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStepFormContext } from "../../context/form.context";
import { FormStep, stepLabels } from "./Steps/utils/descriptions";
import FormSteps from "./Steps/AnimatedStep/utils/FormStep";

const FormContainer = () => {
  const { step, totalSteps } = useStepFormContext();

  return (
    <div className="space-y-4">
      <Indicator totalSteps={totalSteps} step={step} />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Criação de usuários
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
  );
};

export default memo(FormContainer);
