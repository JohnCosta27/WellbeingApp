import { FC, ReactNode } from "react";

interface CardProps {
  title?: string;
  children?: ReactNode;
}

export const Card: FC<CardProps> = ({ title, children }) => (
  <div className="w-full min-h-[250px] bg-white shadow-xl py-6 px-4 flex flex-col">
    {title && <h2 className="font-bold text-2xl">{title}</h2>}
    {children}
  </div>
);
