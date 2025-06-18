import { z } from "zod";
import outPersonalFormSchema from "./personalForm.schema";

export type OutPersonalFormTypes = z.infer<typeof outPersonalFormSchema>;
