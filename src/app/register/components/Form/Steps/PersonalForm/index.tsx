import { memo, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/ErrorMessage";

import { OutPersonalFormTypes } from "./utils/personalForm.interface";
import outPersonalFormSchema from "./utils/personalForm.schema";
import { useFormatter } from "@/hooks/useFormatter";
import ButtonNavigation from "../buttonNavigation";
import { useStepFormContext } from "@/app/register/context/form.context";
import useFormatterPersonalForm from "./hooks/useFormatterPersonalForm";

const PersonalForm = () => {
  const { formatName, formatPhone, formatEmail } = useFormatter();
  const { handleBack, handleNext, handlePersonalData, personalData } =
    useStepFormContext();
  const { transformInitialValues } = useFormatterPersonalForm();

  const defaultValues: OutPersonalFormTypes = useMemo(
    () => transformInitialValues(personalData),
    [personalData]
  );

  const method = useForm<OutPersonalFormTypes>({
    resolver: zodResolver(outPersonalFormSchema),
    defaultValues,
  });

  const {
    register,
    reset,
    formState: { errors },
  } = method;

  useEffect(() => {
    reset(transformInitialValues(personalData));
  }, [reset, personalData]);

  const onSubmit = (data: OutPersonalFormTypes) => {
    handlePersonalData(data);
    handleNext();
  };

  return (
    <FormProvider {...method}>
      <ButtonNavigation handleBack={handleBack} onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-6" aria-label="Dados Pessoais">
          <div className="flex flex-col gap-1">
            <Label htmlFor="full_name">Nome Completo</Label>
            <Input
              id="full_name"
              placeholder="Digite seu nome"
              {...register("full_name", {
                onChange: (e) => {
                  e.target.value = formatName(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <ErrorMessage message={errors.full_name?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu melhor e-mail"
              {...register("email", {
                onChange: (e) => {
                  e.target.value = formatEmail(e.target.value);
                },
              })}
              autoComplete="off"
              autoCapitalize="off"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Digite seu telefone"
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = formatPhone(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>
        </fieldset>
      </ButtonNavigation>
    </FormProvider>
  );
};

export default memo(PersonalForm);
