import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ErrorMessage";

import { OutPersonalFormTypes } from "./utils/personalForm.interface";
import outPersonalFormSchema from "./utils/personalForm.schema";
import { useFormatter } from "@/hooks/useFormatter";

const PersonalForm = () => {
  const { formatName, formatPhone, formatEmail } = useFormatter();
  const step = 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OutPersonalFormTypes>({
    resolver: zodResolver(outPersonalFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: OutPersonalFormTypes) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      noValidate
    >
      <fieldset className="flex flex-col gap-6" aria-label="Dados Pessoais">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            {...register("name")}
            onChange={(e) => {
              e.target.value = formatName(e.target.value);
            }}
            autoComplete="off"
          />
          <ErrorMessage message={errors.name?.message} />
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

export default memo(PersonalForm);
