import { useCurrentUserQuery, useModulesQuery } from "@wellbeing/graphql-types";
import { FC } from "react";

export const MyProgress: FC = () => {
  const bruh = useCurrentUserQuery();
  const modules = useModulesQuery();

  console.log(modules);

  return null;
};
