export enum FormStep {
  Personal = 0,
  Address = 1,
  Confirm = 2,
}

export const stepLabels: Record<FormStep, string> = {
  [FormStep.Personal]: "Dados Pessoais",
  [FormStep.Address]: "Endereço",
  [FormStep.Confirm]: "Confirme seus dados",
};
