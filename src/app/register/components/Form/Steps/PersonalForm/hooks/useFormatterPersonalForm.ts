import { OutPersonalFormTypes } from "../utils/personalForm.interface";

const useFormatterPersonalForm = () => {
  const transformInitialValues = (
    personal: OutPersonalFormTypes
  ): OutPersonalFormTypes => ({
    full_name: personal.full_name ?? "",
    email: personal.email ?? "",
    phone: personal.phone ?? "",
  });

  return { transformInitialValues };
};

export default useFormatterPersonalForm;
