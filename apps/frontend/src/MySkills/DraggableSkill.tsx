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
    <li
      ref={drag}
      className={clsx("list-disc text-lg", isDragging && "bg-red-200")}
    >
      {name}
    </li>
  );
};
