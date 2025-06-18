import { useMemo } from "react";
import { OutPersonalFormTypes } from "../utils/personalForm.interface";

const useFormatterPersonalForm = () => {
  const transformInitialValues = (): OutPersonalFormTypes => ({
    full_name: "",
    email: "",
    phone: "",
  });

  const defaultValues: OutPersonalFormTypes = useMemo(
    () => transformInitialValues(),
    []
  );

  return { defaultValues };
};

export default useFormatterPersonalForm;
