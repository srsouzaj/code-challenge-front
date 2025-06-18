"use client";

import FormContainer from "@/components/Form";
import { FormProvider } from "./register/context/form.context";

export default function Home() {
  return (
    <main className="container">
      <FormProvider>
        <FormContainer />
      </FormProvider>
    </main>
  );
}
