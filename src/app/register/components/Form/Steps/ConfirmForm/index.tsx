import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { memo, useCallback } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { OutConfirmFormTypes } from "./utils/confirmForm.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import outConfirmFormSchema from "./utils/confirmForm.schema";
import ErrorMessage from "@/components/ErrorMessage";
import ButtonNavigation from "../buttonNavigation";
import { useStepFormContext } from "@/app/register/context/form.context";

const ConfirmForm = () => {
  const { handleBack } = useStepFormContext();
  const method = useForm<OutConfirmFormTypes>({
    resolver: zodResolver(outConfirmFormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const {
    control,
    formState: { errors },
  } = method;

  const onSubmit = useCallback((data: OutConfirmFormTypes) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...method}>
      <ButtonNavigation handleBack={handleBack} onSubmit={onSubmit}>
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
      </ButtonNavigation>
    </FormProvider>
  );
};

export default memo(ConfirmForm);
