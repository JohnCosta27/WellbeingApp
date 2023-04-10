import { FC, ReactNode } from "react";

interface MentalEnergyProps {
  children: ReactNode;
}

export const MentalEnergy: FC<MentalEnergyProps> = ({ children }) => (
  <div className="w-full h-full flex items-center p-4">
    <div className="w-48 bg-primary"></div>
    <div className="w-full bg-primary">{children}</div>
  </div>
);
