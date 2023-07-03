import clsx from "clsx";
import { FC } from "react";
import { useDrag } from "react-dnd";

interface DraggableSkillProps {
  name: string;
}

export const DraggableSkill: FC<DraggableSkillProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: { skill: name },
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
      {name}
    </div>
  );
};
