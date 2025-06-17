import { z } from "zod";
import { validStates } from "./state";

function tupleToEnum<T extends readonly [string, ...string[]]>(arr: T) {
  return arr;
}

const validStatesTuple = tupleToEnum(validStates);

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
