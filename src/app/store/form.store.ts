import { create } from "zustand";

import { OutUsers } from "@/services/apiServices/Users/Models";
import { BrazilianStates } from "@/components/Form/Steps/AddressForm/utils/state";
import { OutPersonalFormTypes } from "@/components/Form/Steps/PersonalForm/utils/personalForm.interface";
import { OutAddressFormTypes } from "@/components/Form/Steps/AddressForm/utils/address.interface";

interface FormState {
  step: number;
  totalSteps: number;
  personalData: OutPersonalFormTypes;
  addressData: OutAddressFormTypes;
  isEdit: boolean;
  userId: number | undefined;

  handleBack: () => void;
  handleNext: () => void;
  handlePersonalData: (value: OutPersonalFormTypes) => void;
  handleAddressData: (value: OutAddressFormTypes) => void;
  handleResetForm: () => void;
  handleIsEdit: (value: boolean) => void;
  handleGetInfoForEdit: (user: OutUsers) => void;
}

export const useFormStore = create<FormState>((set) => ({
  step: 0,
  totalSteps: 3,
  personalData: {} as OutPersonalFormTypes,
  addressData: {} as OutAddressFormTypes,
  isEdit: false,
  userId: undefined,

  handleBack: () =>
    set((state) => ({
      step: state.step > 0 ? state.step - 1 : 0,
    })),

  handleNext: () =>
    set((state) => ({
      step: state.step + 1,
    })),

  handlePersonalData: (value) =>
    set(() => ({
      personalData: value,
    })),

  handleAddressData: (value) =>
    set(() => ({
      addressData: value,
    })),

  handleResetForm: () =>
    set(() => ({
      step: 0,
      personalData: {} as OutPersonalFormTypes,
      addressData: {} as OutAddressFormTypes,
      isEdit: false,
      userId: undefined,
    })),

  handleIsEdit: (value: boolean) =>
    set(() => ({
      isEdit: value,
    })),

  handleGetInfoForEdit: (user) => {
    set({
      isEdit: true,
      userId: user.id,
      personalData: {
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
      } as OutPersonalFormTypes,
      addressData: {
        address: user.address,
        cep: user.zip_code,
        city: user.city,
        number: user.number,
        state: user.state as BrazilianStates,
      } as OutAddressFormTypes,
    });
  },
}));
