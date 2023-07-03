import { FC } from "react";
import { Card } from "../ui";

export const MySkills: FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Skills</h2>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 ">
        <Card
          title="Current Skills"
          description="Skills that you have acquired along your journey"
          className="col-span-1"
        >
          <div>bruh skill</div>
        </Card>
        <Card
          title="Still Acquiring"
          className="col-span-2 lg:col-span-1"
          description="Skills that you haven't quite managed to fully acquire yet"
        ></Card>
      </div>
    </div>
  );
};
