import { memo } from "react";
import { Controller, Control } from "react-hook-form";

import {
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { OutAddressFormTypes } from "@/app/register/components/Form/Steps/AddressForm/utils/address.interface";
import {
  BrazilianStates,
  Option,
} from "@/app/register/components/Form/Steps/AddressForm/utils/state";

interface FormSelectProps {
  name: keyof OutAddressFormTypes;
  control: Control<OutAddressFormTypes>;
  label: string;
  options: Option[];
  placeholder?: string;
}

const Select = ({
  name,
  control,
  label,
  options,
  placeholder,
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectRoot
            onValueChange={(value) => field.onChange(value as BrazilianStates)}
            value={field.value as BrazilianStates}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectRoot>
        )}
      />
    </div>
  );
};

export default memo(Select);
