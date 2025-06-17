import { z } from "zod";

const outConfirmFormSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos e condições.",
  }),
});

export default outConfirmFormSchema;
