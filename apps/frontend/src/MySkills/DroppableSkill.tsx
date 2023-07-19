/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TrashIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC } from "react";
import { useDrop } from "react-dnd";

interface DroppableSkillProps {
  readonly skill: string | undefined;
  readonly index: number;
  readonly onDropSkill: (skill: string, index: number) => void;
  readonly onDelete: (skill: string) => void;
}

export const DroppableSkill: FC<DroppableSkillProps> = ({
  skill,
  index,
  onDropSkill,
  onDelete,
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
        "border-2 border-primary rounded text-2xl flex flex-col p-2",
        isOver && "bg-red-200"
      )}
    >
      {skill ?? "Drop Skill Here"}
      {skill && (
        <div
          className="mt-auto w-full flex justify-end"
          onClick={() => onDelete(skill)}
        >
          <div className="w-4">
            <TrashIcon />
          </div>
        </div>
      )}
    </div>
  );
};
