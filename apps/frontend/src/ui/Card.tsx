import clsx from "clsx";
import { FC, ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export const Card: FC<CardProps> = ({
  title,
  description,
  className = "",
  children,
}) => (
  <div
    className={clsx(
      "w-full h-full bg-white shadow-xl p-4 flex flex-col min-h-fit",
      className
    )}
  >
    <div className="mb-4">
      {title && <h2 className="font-bold text-2xl">{title}</h2>}
      {description && <h3 className="font-normal text-lg">{description}</h3>}
    </div>
    {children}
  </div>
);
