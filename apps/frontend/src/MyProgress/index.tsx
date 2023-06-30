import { useCurrentUserQuery } from "@wellbeing/graphql-types";
import { FC } from "react";

import ModuleSelector from "./ModuleSelector";
import SubmitAssignment from "./SubmitAssignment";
import Assignments from "./Assignments";
import OverallStats from "./OverallStats";

export const MyProgress: FC = () => {
  const user = useCurrentUserQuery();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Progress</h2>
        <h4 className="text-xl">View how you are doing in your modules.</h4>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6 grid-rows-bigger-dashboard xl:grid-rows-dashboard">
        <SubmitAssignment modules={user.data?.currentUser.modules} />
        <OverallStats modules={user.data?.currentUser.modules} />
        <ModuleSelector user={user.data?.currentUser} />
        <Assignments modules={user.data?.currentUser.modules} />
      </div>
    </div>
  );
};
