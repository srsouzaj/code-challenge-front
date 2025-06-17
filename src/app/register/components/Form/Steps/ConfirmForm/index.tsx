import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { memo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { OutConfirmFormTypes } from "./utils/confirmForm.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import outConfirmFormSchema from "./utils/confirmForm.schema";
import ErrorMessage from "@/components/ErrorMessage";

const ConfirmForm = () => {
  const step = 0;
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<OutConfirmFormTypes>({
    resolver: zodResolver(outConfirmFormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = useCallback((data: OutConfirmFormTypes) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex space-x-3 space-y-0 rounded-md border p-4">
        <span className="flex gap-2">
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="acceptTerms"
              />
            )}
          />
          <Label>Aceito os termos e condições</Label>
        </span>
        <ErrorMessage message={errors.acceptTerms?.message} />
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          size="sm"
          variant={"outline"}
          className="font-medium"
          disabled={step === (0 as number)}
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

export default memo(ConfirmForm);
