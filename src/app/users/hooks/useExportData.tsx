import { useCallback } from "react";
import { OutUsers } from "@/services/apiServices/Users/Models";

type CsvUser = Omit<OutUsers, "id" | "updatedAt" | "terms_accepted">;

const fieldsMap: Record<keyof CsvUser, string> = {
  full_name: "Nome",
  email: "E-mail",
  phone: "Telefone",
  zip_code: "CEP",
  address: "Endereço",
  number: "Número",
  city: "Cidade",
  state: "Estado",
  createdAt: "Criado em",
};

export function useExportData() {
  const exportCSV = useCallback(
    (data: OutUsers[], filename = "usuarios.csv") => {
      if (!data || data.length === 0) return;

      const keys = Object.keys(fieldsMap) as (keyof CsvUser)[];
      const header = keys.map((key) => fieldsMap[key]);
      const csvRows = [
        header.join(","),
        ...data.map((row) =>
          keys
            .map((key) => {
              let value = row[key];
              if (key === "createdAt" && typeof value === "string") {
                value = new Date(value).toLocaleDateString("pt-BR");
              }
              if (typeof value === "string") {
                value = value.replace(/"/g, '""');
              }
              return `"${value ?? ""}"`;
            })
            .join(",")
        ),
      ];
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  const exportJSON = useCallback(
    (data: OutUsers[], filename = "usuarios.json") => {
      if (!data || data.length === 0) return;

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  return { exportCSV, exportJSON };
}
