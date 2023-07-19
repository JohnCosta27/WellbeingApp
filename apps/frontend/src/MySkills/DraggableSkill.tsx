/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { FC } from "react";
import { useDrag } from "react-dnd";

interface DraggableSkillProps {
  name: string;
  onClick: (skill: string) => void;
}

export const DraggableSkill: FC<DraggableSkillProps> = ({ name, onClick }) => {
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
      onClick={() => onClick(name)}
    >
      {name}
    </li>
  );
};
