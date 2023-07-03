import clsx from "clsx";
import { FC } from "react";
import { useDrag } from "react-dnd";

export const DraggableSkill: FC = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BRUH",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx("w-24 h-24 bg-red-200", isDragging && "bg-red-500")}
    >
      bruh skill
    </div>
  );
};
