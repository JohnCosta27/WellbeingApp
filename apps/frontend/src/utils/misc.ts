import { MentalEnergy } from "@wellbeing/graphql-types";

export const getLast7DaysEnergy = (energies: MentalEnergy[]): number  => {
  if (energies.length === 0) return 0;
  return energies.reduce((p, n) => p + n.level, 0) / energies.length;
};
