import { OutAddress } from "@/services/apiServices/Address/Models";
import { OutAddressFormTypes } from "../utils/address.interface";
import { validStates } from "../utils/state";
import { useMemo } from "react";

const useFormatterForm = () => {
  const changeValuesforNewCEP = ({
    add,
  }: {
    add?: OutAddress;
  }): OutAddressFormTypes => ({
    address: add?.logradouro ?? "",
    cep: add?.cep ?? "",
    city: add?.bairro ?? "",
    number: "",
    state: validStates.includes(add?.uf as (typeof validStates)[number])
      ? (add?.uf as OutAddressFormTypes["state"])
      : "SP",
  });

  const transformInitialValues = (): OutAddressFormTypes => ({
    address: "",
    cep: "",
    city: "",
    number: "",
    state: "" as OutAddressFormTypes["state"],
  });

  const defaultValues: OutAddressFormTypes = useMemo(
    () => transformInitialValues(),
    []
  );

  return { defaultValues, changeValuesforNewCEP };
};

export default useFormatterForm;
