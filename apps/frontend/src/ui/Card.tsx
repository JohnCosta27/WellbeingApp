import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="w-full bg-white shadow-xl py-6 px-4">{children}</div>
);
