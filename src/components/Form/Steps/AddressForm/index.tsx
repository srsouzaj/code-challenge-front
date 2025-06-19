"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { OutAddressFormTypes } from "./utils/address.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@/components/Select";
import statesOptions from "./utils/state";
import useConsultarCEP from "./hooks/useConsultarCep";
import useFormatterAddressForm from "./hooks/useFormatterAddressForm";
import { useFormatter } from "@/hooks/useFormatter";
import ButtonNavigation from "../buttonNavigation";
import { toast } from "sonner";
import outAddressFormSchema from "./utils/address.schema";
import { useFormStore } from "@/app/store/form.store";

const AddressForm = () => {
  const { changeValuesforNewCEP, transformInitialValues } =
    useFormatterAddressForm();
  const prevAddressRef = useRef<string>("");
  const prevAddressDataRef = useRef<string>("");

  const { handleNext, handleBack, handleAddressData, addressData } =
    useFormStore();

  const { formatCEP } = useFormatter();

  const defaultValues: OutAddressFormTypes = useMemo(
    () => transformInitialValues(addressData),
    [addressData, transformInitialValues]
  );

  const methods = useForm<OutAddressFormTypes>({
    resolver: zodResolver(outAddressFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const cep = watch("cep");
  const { address, message } = useConsultarCEP(cep);

  useEffect(() => {
    if (address && address.logradouro) {
      if (prevAddressRef.current !== address.logradouro) {
        reset(
          changeValuesforNewCEP({ add: address, number: addressData.number })
        );
        prevAddressRef.current = address.logradouro;
      }
    }
  }, [address, reset, addressData.number]);

  useEffect(() => {
    const currentDataString = JSON.stringify(addressData);
    if (prevAddressDataRef.current !== currentDataString) {
      reset(transformInitialValues(addressData));
      prevAddressDataRef.current = currentDataString;
    }
  }, [reset, addressData]);

  useEffect(() => {
    if (message)
      toast(message, {
        description:
          "Caso esteja preenchido corretamente, será necessário inseri-los manualmente.",
      });
  }, [message]);

  const onSubmitAddress = (data: OutAddressFormTypes) => {
    handleAddressData(data);
    handleNext();
  };

  return (
    <FormProvider {...methods}>
      <ButtonNavigation handleBack={handleBack} onSubmit={onSubmitAddress}>
        <section
          aria-label="Formulário de Endereço"
          className="flex flex-col gap-4"
        >
          <fieldset className="flex flex-col gap-1" aria-describedby="cep-desc">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              placeholder="Digite seu CEP"
              autoComplete="off"
              aria-invalid={!!errors.cep}
              aria-describedby={`cep-desc ${errors.cep ? "error-cep" : ""}`}
              {...register("cep", {
                onChange: (e) => {
                  e.target.value = formatCEP(e.target.value);
                },
              })}
            />
            <p id="cep-desc" className="font-thin text-xs">
              Digite o CEP e, caso seja localizado em nosso banco, os campos de
              endereço serão preenchidos automaticamente.
            </p>
            <ErrorMessage id="error-cep" message={errors.cep?.message} />
          </fieldset>

          <fieldset
            className="flex w-full gap-4"
            aria-label="Endereço e Número"
          >
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="address">Endereço (logradouro)</Label>
              <Input
                id="address"
                placeholder="Digite seu endereço"
                autoComplete="off"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "error-address" : undefined}
                {...register("address")}
              />
              <ErrorMessage
                id="error-address"
                message={errors.address?.message}
              />
            </div>
            <div className="flex flex-col gap-1 w-32">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                placeholder="ex: 1234"
                autoComplete="off"
                aria-invalid={!!errors.number}
                aria-describedby={errors.number ? "error-number" : undefined}
                {...register("number")}
              />
              <ErrorMessage
                id="error-number"
                message={errors.number?.message}
              />
            </div>
          </fieldset>

          {/* Estado e Cidade */}
          <fieldset className="flex w-full gap-4" aria-label="Estado e Cidade">
            <div className="flex flex-col gap-1 w-40">
              <Select
                name="state"
                control={control}
                label="Estado"
                options={statesOptions}
                placeholder="Selecione o estado"
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? "error-state" : undefined}
              />
              <ErrorMessage id="error-state" message={errors.state?.message} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Digite sua cidade"
                autoComplete="off"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "error-city" : undefined}
                {...register("city")}
              />
              <ErrorMessage id="error-city" message={errors.city?.message} />
            </div>
          </fieldset>
        </section>
      </ButtonNavigation>
    </FormProvider>
  );
};

export default memo(AddressForm);
