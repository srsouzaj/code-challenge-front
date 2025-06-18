import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { memo, useCallback } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { OutConfirmFormTypes } from "./utils/confirmForm.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import outConfirmFormSchema from "./utils/confirmForm.schema";
import ErrorMessage from "@/components/ErrorMessage";
import ButtonNavigation from "../buttonNavigation";
import { Separator } from "@/components/ui/separator";
import useCriarUsuario from "./hooks/useCriarUsuario";
import { InUsers } from "@/services/apiServices/Users/Models";
import { useFormStore } from "@/app/register/stores/form.store";
import useAtualizarUsuario from "./hooks/useAtualizarUsuario";

const ConfirmForm = () => {
  const { handleBack, personalData, addressData, isEdit, userId } =
    useFormStore();
  const { criarUsuarios, loadingCriarUsuarios } = useCriarUsuario();
  const { atualizarUsuario, loadingAtualizarUsuarios } = useAtualizarUsuario();
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

  const onSubmit = useCallback(
    ({ acceptTerms }: OutConfirmFormTypes) => {
      const { full_name, email, phone } = personalData;

      const { cep, address, number, city, state } = addressData;

      const userPayload: InUsers = {
        full_name,
        email,
        phone,
        zip_code: cep,
        address,
        number,
        city,
        state,
        terms_accepted: acceptTerms,
      };

      if (isEdit && userId) {
        atualizarUsuario({ userId, users: userPayload });
      } else {
        criarUsuarios(userPayload);
      }
    },
    [personalData, addressData, isEdit, userId, atualizarUsuario, criarUsuarios]
  );

  return (
    <FormProvider {...method}>
      <ButtonNavigation
        handleBack={handleBack}
        isLoading={isEdit ? loadingAtualizarUsuarios : loadingCriarUsuarios}
        onSubmit={onSubmit}
      >
        <aside className="flex flex-col gap-1">
          <p className="font-semibold text-primary text-xl">Dados Pessoais:</p>
          <span className="font-normal text-sm">
            <b className="text-primary">Nome:</b> {personalData.full_name}
          </span>
          <span className="font-normal text-sm">
            <b className="text-primary">Email:</b> {personalData.email}
          </span>
          <span className="font-normal text-sm">
            <b className="text-primary">Phone:</b> {personalData.phone}
          </span>
        </aside>
        <Separator />
        <aside className="flex flex-col gap-1">
          <p className="font-semibold text-primary text-lg">Endereço:</p>
          <span className="font-normal text-sm">
            <b className="text-primary">Logradouro:</b> {addressData.address},{" "}
            {addressData.number}
          </span>
          <span className="font-normal text-sm">
            {addressData.city} - {addressData.state}
          </span>
          <span className="font-normal text-sm">{addressData.cep}</span>
        </aside>
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
