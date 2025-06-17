import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

const AddressForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        key="7lo4Ss2b"
        control={control}
        name="7lo4Ss2b"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Digite seu CEP"
                autoComplete="off"
              />
            </FormControl>
            <FormDescription>
              Digite o CEP e os campos de endereço serão preenchidos
              automaticamente.
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        key="eGN6BmhY"
        control={control}
        name="eGN6BmhY"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Digite seu endereço"
                autoComplete="off"
              />
            </FormControl>
            <FormDescription></FormDescription>
          </FormItem>
        )}
      />

      <FormField
        key="NMJv7HAY"
        control={control}
        name="NMJv7HAY"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input {...field} placeholder="ex: 1234" autoComplete="off" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        key="BE1YBxCQ"
        control={control}
        name="BE1YBxCQ"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Digite sua cidade"
                autoComplete="off"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default memo(AddressForm);
