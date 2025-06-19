"use client";

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
import useFormatterPersonalForm from "./hooks/useFormatterPersonalForm";
import { useFormStore } from "@/app/store/form.store";

const PersonalForm = () => {
  const { formatName, formatPhone, formatEmail } = useFormatter();
  const { handleBack, handleNext, handlePersonalData, personalData } =
    useFormStore();
  const { transformInitialValues } = useFormatterPersonalForm();

  const defaultValues: OutPersonalFormTypes = useMemo(
    () => transformInitialValues(personalData),
    [personalData]
  );

  const methods = useForm<OutPersonalFormTypes>({
    resolver: zodResolver(outPersonalFormSchema),
    defaultValues,
  });

  const {
    register,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset(transformInitialValues(personalData));
  }, [reset, personalData]);

  const onSubmit = (data: OutPersonalFormTypes) => {
    handlePersonalData(data);
    handleNext();
  };

  return (
    <FormProvider {...methods}>
      <ButtonNavigation handleBack={handleBack} onSubmit={onSubmit}>
        <fieldset
          role="group"
          aria-label="Dados Pessoais"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="full_name">Nome Completo</Label>
            <Input
              id="full_name"
              placeholder="Digite seu nome"
              aria-invalid={!!errors.full_name}
              aria-describedby="error-full_name"
              {...register("full_name", {
                onChange: (e) => {
                  e.target.value = formatName(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <ErrorMessage
              message={errors.full_name?.message}
              id="error-full_name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu melhor e-mail"
              aria-invalid={!!errors.email}
              aria-describedby="error-email"
              {...register("email", {
                onChange: (e) => {
                  e.target.value = formatEmail(e.target.value);
                },
              })}
              autoComplete="off"
              autoCapitalize="off"
            />
            <ErrorMessage message={errors.email?.message} id="error-email" />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Digite seu telefone"
              aria-invalid={!!errors.phone}
              aria-describedby="error-phone"
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = formatPhone(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <ErrorMessage message={errors.phone?.message} id="error-phone" />
          </div>
        </fieldset>
      </ButtonNavigation>
    </FormProvider>
  );
};

export default memo(PersonalForm);
