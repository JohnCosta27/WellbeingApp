/* eslint-disable react/jsx-no-bind */
import { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "../ui";
import { DraggableSkill } from "./DraggableSkill";
import { DroppableSkill } from "./DroppableSkill";

export const MySkills: FC = () => {
  const [skills, setSkills] = useState<
    Array<{ skill: string; index: undefined | number }>
  >([
    { skill: "skill 1", index: undefined },
    { skill: "skill 2", index: undefined },
    { skill: "skill 3", index: undefined },
    { skill: "skill 4", index: undefined },
    { skill: "skill 5", index: undefined },
    { skill: "skill 6", index: undefined },
  ]);

  function onDropSkill(skill: string, index: number): void {
    const item = skills.find((s) => s.skill === skill);
    if (!item) return;

    const prev = skills.find((s) => s.index === index);
    if (prev) {
      prev.index = undefined;
    }

    item.index = index;
    setSkills([...skills]);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <h2 className="text-3xl font-bold">My Skills</h2>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 ">
          <Card
            title="Current Skills"
            description="Skills that you have acquired along your journey"
            className="col-span-1 h-[80vh]"
          >
            {skills
              .filter((s) => s.index === undefined)
              .map((s) => (
                <DraggableSkill key={s.skill} name={s.skill} />
              ))}
          </Card>
          <Card
            title="Still Acquiring"
            className="col-span-2 lg:col-span-1 h-[80vh]"
            description="Skills that you haven't quite managed to fully acquire yet"
          >
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={0}
              skill={skills.find((s) => s.index === 0)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={1}
              skill={skills.find((s) => s.index === 1)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={2}
              skill={skills.find((s) => s.index === 2)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={3}
              skill={skills.find((s) => s.index === 3)?.skill}
            />
            <DroppableSkill
              onDropSkill={onDropSkill}
              index={4}
              skill={skills.find((s) => s.index === 4)?.skill}
            />
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};
