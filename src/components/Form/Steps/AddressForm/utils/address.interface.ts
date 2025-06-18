import { z } from "zod";
import outAddressFormSchema from "./address.schema";

export type OutAddressFormTypes = z.infer<typeof outAddressFormSchema>;
