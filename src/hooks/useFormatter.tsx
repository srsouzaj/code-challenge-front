import { useCallback } from "react";

export const useFormatter = () => {
  const formatName = useCallback((value: string) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }, []);

  const formatPhone = useCallback((value: string) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

    if (onlyNumbers.length <= 2) {
      return onlyNumbers;
    }

    if (onlyNumbers.length <= 6) {
      return onlyNumbers.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    }

    if (onlyNumbers.length <= 10) {
      return onlyNumbers.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }

    return onlyNumbers.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }, []);

  const formatEmail = useCallback((value: string) => {
    let formatted = value.toLowerCase();

    formatted = formatted.replace(/[^a-z0-9.@_-]/g, "");

    formatted = formatted.replace(/[;:]/g, "");

    return formatted;
  }, []);

  const formatCEP = useCallback((value: string) => {
    let digitsOnly = value.replace(/\D/g, "");

    digitsOnly = digitsOnly.slice(0, 8);

    if (digitsOnly.length > 5) {
      return digitsOnly.slice(0, 5) + "-" + digitsOnly.slice(5);
    }

    return digitsOnly;
  }, []);

  return { formatPhone, formatName, formatEmail, formatCEP };
};
