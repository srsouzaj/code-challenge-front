export enum BrazilianStates {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MT = "MT",
  MS = "MS",
  MG = "MG",
  PA = "PA",
  PB = "PB",
  PR = "PR",
  PE = "PE",
  PI = "PI",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SP = "SP",
  SE = "SE",
  TO = "TO",
}

export const validStates = Object.values(
  BrazilianStates
) as readonly BrazilianStates[];

export interface Option {
  label: string;
  value: BrazilianStates;
}

export const statesOptions: Option[] = validStates.map((state) => ({
  label: state,
  value: state,
}));

export default statesOptions;
