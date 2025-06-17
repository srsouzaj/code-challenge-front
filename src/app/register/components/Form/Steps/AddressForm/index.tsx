"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { OutAddressFormTypes } from "./utils/address.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import outAddressFormSchema from "./utils/address.schema";
import Select from "@/components/Select";
import statesOptions from "./utils/state";
import useConsultarCEP from "./hook/useConsultarCep";
import useFormatterForm from "./hook/useFormatterForm";
import { useFormatter } from "@/hooks/useFormatter";
import ButtonNavigation from "../buttonNavigation";
import { useStepFormContext } from "@/app/register/context/form.context";

const AddressForm = () => {
  const { changeValuesforNewCEP, defaultValues } = useFormatterForm();
  const { handleNext, handleBack } = useStepFormContext();
  const { formatCEP } = useFormatter();

  const method = useForm<OutAddressFormTypes>({
    resolver: zodResolver(outAddressFormSchema),
    defaultValues,
  });
  const {
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = method;

  const cep = watch("cep");

  const { address } = useConsultarCEP(cep);

  useEffect(() => {
    if (address && address.logradouro) {
      reset(changeValuesforNewCEP({ add: address }));
    }
  }, [address, reset]);

  const onSubmitAddress = (data: OutAddressFormTypes) => {
    console.log(data);
    handleNext();
  };

  return (
    <FormProvider {...method}>
      <ButtonNavigation handleBack={handleBack} onSubmit={onSubmitAddress}>
        <aside className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              placeholder="Digite seu CEP"
              autoComplete="off"
              {...register("cep", {
                onChange: (e) => {
                  e.target.value = formatCEP(e.target.value);
                },
              })}
            />
            <p className="font-thin text-xs">
              Digite o CEP e, caso seja localizados em nosso banco, os campos de
              endereço serão preenchidos automaticamente.
            </p>
            <ErrorMessage message={errors.cep?.message} />
          </div>

          <div className="flex w-full gap-2">
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Digite seu endereço"
                autoComplete="off"
                {...register("address")}
              />
              <ErrorMessage message={errors.address?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                placeholder="ex: 1234"
                autoComplete="off"
                {...register("number")}
              />
              <ErrorMessage message={errors.number?.message} />
            </div>
          </div>

          <div className="flex w-full gap-2">
            <div>
              <Select
                placeholder="Selecione o estado"
                name="state"
                control={control}
                label="Estado"
                options={statesOptions}
              />
              <ErrorMessage message={errors.state?.message} />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Digite sua cidade"
                autoComplete="off"
                {...register("city")}
              />
              <ErrorMessage message={errors.city?.message} />
            </div>
          </div>
        </aside>
      </ButtonNavigation>
    </FormProvider>
  );
};

export default memo(AddressForm);
