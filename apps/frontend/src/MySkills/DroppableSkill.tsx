import clsx from "clsx";
import { FC, useState } from "react";
import { useDrop } from "react-dnd";

export const DroppableSkill: FC = () => {
  const [hasDropped, setHasDropped] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "BRUH",
      drop: () => {
        setHasDropped(true);
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
      className={clsx("w-24 h-24", isOver ? "bg-red-500" : "bg-red-200")}
    >
      {hasDropped ? "I have been dropped" : "bruh"}
    </div>
  );
};
