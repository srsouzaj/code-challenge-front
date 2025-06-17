export const validStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

const statesOptions: StatesOptionsProps[] = validStates.map((state) => ({
  label: state,
  value: state,
}));

export default statesOptions;

interface StatesOptionsProps {
  label: string;
  value: string;
}
