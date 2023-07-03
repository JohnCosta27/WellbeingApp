import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "../ui";
import { DraggableSkill } from "./DraggableSkill";
import { DroppableSkill } from "./DroppableSkill";

export const MySkills: FC = () => {
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
            <DraggableSkill />
          </Card>
          <Card
            title="Still Acquiring"
            className="col-span-2 lg:col-span-1 h-[80vh]"
            description="Skills that you haven't quite managed to fully acquire yet"
          >
            <DroppableSkill />
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};
