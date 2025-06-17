import * as z from "zod";

const outPersonalFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  phone: z
    .string()
    .min(14, "Telefone incompleto")
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10;
      },
      {
        message: "Número de telefone inválido",
      }
    ),
});

export default outPersonalFormSchema;
