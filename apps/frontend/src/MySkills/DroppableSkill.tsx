import clsx from "clsx";
import { FC } from "react";
import { useDrop } from "react-dnd";

interface DroppableSkillProps {
  readonly skill: string | undefined;
  readonly onDropSkill: (skill: string, index: number) => void;
  readonly index: number;
}

export const DroppableSkill: FC<DroppableSkillProps> = ({
  skill,
  onDropSkill,
  index,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "BRUH",
      drop: (item: { skill: string }) => {
        onDropSkill(item.skill, index);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      className={clsx(
        "border-2 border-primary rounded text-2xl",
        isOver && "bg-red-200"
      )}
    >
      {skill ?? "Drop Skill Here"}
    </div>
  );
};
