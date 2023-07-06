/* eslint-disable no-bitwise */
import { MentalEnergy, UserModules } from "@wellbeing/graphql-types";

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

export type extractedData = {
  modules: {
    moduleName: string;
    completedScore: number;
    failedScore: number;
    uncompletedAmount: number;
  }[];
  uncompletedAmount: number;
  failedScore: number;
  completedScore: number;
};

/**
 * Takes a list of userModules, then returns a list of modules with their scores
 * and the total uncompleted amount and failed score. (not scaled)
 */
export const reduceModules = (data: UserModules[]) =>
  data
    .map((module) => {
      const completedScore = module.assignments.reduce(
        (acc, curr) => acc + (curr.score * curr.percent) / 100,
        0
      );

      const uncompletedAmount =
        100 - module.assignments.reduce((acc, curr) => acc + curr.percent, 0);

      const failedScore = 100 - completedScore - uncompletedAmount;

      return {
        moduleName: module.module.name,
        completedScore,
        failedScore,
        uncompletedAmount,
      };
    })
    .reduce(
      (acc, curr) => {
        acc.uncompletedAmount += curr.uncompletedAmount;
        acc.failedScore += curr.failedScore;
        acc.completedScore += curr.completedScore;
        acc.modules.push(curr);
        return acc;
      },
      {
        modules: [],
        uncompletedAmount: 0,
        failedScore: 0,
        completedScore: 0,
      } as extractedData
    );

export enum PassTypes {
  Passed = "Passed",
  Failed = "Failed",
  Uncompleted = "Uncompleted",
}

export const scaleModuleOverallScore = (data: extractedData) => {
  const total = data.completedScore + data.failedScore + data.uncompletedAmount;
  return {
    [PassTypes.Passed]: Math.round((data.completedScore / total) * 100),
    [PassTypes.Failed]: Math.round((data.failedScore / total) * 100),
    [PassTypes.Uncompleted]: Math.round((data.uncompletedAmount / total) * 100),
  };
};

export const scoreColours: Record<PassTypes, string> = {
  [PassTypes.Passed]: "#5cf76c",
  [PassTypes.Failed]: "#fc6f79",
  [PassTypes.Uncompleted]: "#6d9290",
};
