import clsx from "clsx";
import { FC, ReactNode } from "react";

interface CardProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

export const Card: FC<CardProps> = ({ title, className = "", children }) => (
  <div
    className={clsx(
      "w-full h-full min-h-[250px] bg-white shadow-xl p-4 flex flex-col",
      className
    )}
  >
    {title && <h2 className="font-bold text-2xl">{title}</h2>}
    {children}
  </div>
);
