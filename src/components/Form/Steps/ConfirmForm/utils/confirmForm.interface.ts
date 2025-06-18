import { z } from "zod";
import outConfirmFormSchema from "./confirmForm.schema";

export type OutConfirmFormTypes = z.infer<typeof outConfirmFormSchema>;
