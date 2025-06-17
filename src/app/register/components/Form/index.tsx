// import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import Indicator from "./Indicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import PersonalForm from "./Steps/PersonalForm";

const FormContainer = () => {
  const [step] = useState<number>(0);
  const totalSteps = 3;

  // const form = useForm();

  // const { handleSubmit, reset } = form;
  // const onSubmit = async (formData: unknown) => {
  //   if (step < totalSteps - 1) {
  //     setStep(step + 1);
  //   } else {
  //     console.log(formData);
  //     setStep(0);
  //     reset();

  //     toast.success("Form successfully submitted");
  //   }
  // };

  // const handleBack = () => {
  //   if (step > 0) {
  //     setStep(step - 1);
  //   }
  // };

  return (
    <div className="space-y-4">
      <Indicator totalSteps={totalSteps} step={step} />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Criação de usuários
          </CardTitle>
          <CardDescription>Dados pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(FormContainer);
