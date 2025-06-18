import { OutAddress } from "@/services/apiServices/Address/Models";
import { OutAddressFormTypes } from "../utils/address.interface";
import { BrazilianStates } from "../utils/state";

const useFormatterAddressForm = () => {
  const changeValuesforNewCEP = ({
    add,
    number,
  }: {
    add?: OutAddress;
    number?: string;
  }): OutAddressFormTypes => ({
    address: add?.logradouro ?? "",
    cep: add?.cep ?? "",
    city: add?.localidade ?? "",
    number: number ?? "",
    state: (add?.uf as BrazilianStates) ?? ("" as BrazilianStates),
  });

  const transformInitialValues = (
    addressData: OutAddressFormTypes
  ): OutAddressFormTypes => ({
    address: addressData.address ?? "",
    cep: addressData.cep ?? "",
    city: addressData.city ?? "",
    number: addressData.number ?? "",
    state:
      (addressData.state &&
        BrazilianStates[addressData.state as keyof typeof BrazilianStates]) ??
      ("" as BrazilianStates),
  });

  return { changeValuesforNewCEP, transformInitialValues };
};

export default useFormatterAddressForm;
