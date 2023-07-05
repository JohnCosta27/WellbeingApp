/* eslint-disable no-bitwise */
import { MentalEnergy } from "@wellbeing/graphql-types";

export const getLast7DaysEnergy = (energies: MentalEnergy[]): number => {
  if (energies.length === 0) return 0;
  return energies.reduce((p, n) => p + n.level, 0) / energies.length;
};

// Takes a date and returns if said date is today.
export function isToday(givenDate: Date): boolean {
  const today = new Date();
  return (
    today.getDate() === givenDate.getDate() &&
    today.getMonth() === givenDate.getMonth() &&
    today.getFullYear() === givenDate.getFullYear()
  );
}

const ONE_DAY = 24 * 60 * 60 * 1000;

// Returns a timestmap number (in milliseconds), left until the next day.
export function timeUntilEndOfDay(): number {
  return ONE_DAY - (Math.floor(new Date().getTime()) % ONE_DAY);
}

const colourList = [
  "#EB5B4D",
  "#4BE3DB",
  "#B075EB",
  "#E310DF",
  "#6582EB",
  "#EB5300",
  "#F000E8",
  "#00AEFA",
  "#0EF000",
  "#3800FF",
];

/**
 * Returns a list of colours, with a length of `length`.
 * This is meant to only give a few non-conflicting colours, then the random colours are used if they are needed.
 */
export const getColours = (length: number): string[] => {
  if (length <= colourList.length) {
    return colourList.slice(0, length);
  }
  return [
    ...colourList,
    ...[...Array(length - colourList.length)].map(
      () => `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    ),
  ];
};
