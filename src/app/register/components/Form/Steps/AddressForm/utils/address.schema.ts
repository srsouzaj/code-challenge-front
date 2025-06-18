import { z } from "zod";
import { validStates, BrazilianStates } from "./state";

// converter array para tuple do Zod (que espera tupla)
const validStatesTuple = validStates as unknown as readonly [
  BrazilianStates,
  ...BrazilianStates[]
];

const outAddressFormSchema = z.object({
  cep: z
    .string()
    .nonempty("CEP obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido. Use o formato XXXXX-XXX"),
  address: z.string().nonempty("Endereço obrigatório"),
  number: z.string().nonempty("Número obrigatório"),
  city: z.string().nonempty("Cidade obrigatória"),
  state: z.enum(validStatesTuple, {
    errorMap: () => ({ message: "Estado inválido. Use a sigla correta." }),
  }),
});

export default outAddressFormSchema;
