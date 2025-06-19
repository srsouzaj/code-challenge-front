"use client";

import { memo, useEffect } from "react";
import Indicator from "./Indicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormStep, stepLabels } from "./Steps/utils/descriptions";
import FormSteps from "./Steps/AnimatedStep/utils/FormStep";

import { OutUsers } from "@/services/apiServices/Users/Models";
import { useFormStore } from "@/app/store/form.store";

const FormContainer = ({ user }: { user?: OutUsers }) => {
  const { step, totalSteps, handleGetInfoForEdit, isEdit } = useFormStore();

  useEffect(() => {
    if (user) {
      handleGetInfoForEdit(user);
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <Indicator totalSteps={totalSteps} step={step} />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Etapa {step + 1} de {totalSteps} - {isEdit ? "Edição" : "Criação"}{" "}
            de usuário(s)
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
