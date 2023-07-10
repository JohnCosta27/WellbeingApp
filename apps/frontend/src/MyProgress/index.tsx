import { useCurrentUserQuery } from "@wellbeing/graphql-types";
import { FC, useContext } from "react";

import ModuleSelector from "./ModuleSelector";
import SubmitAssignment from "./SubmitAssignment";
import Assignments from "./Assignments";
import OverallStats from "./OverallStats";
import { UserContext } from "../DashboardLayout";

export const MyProgress: FC = () => {
  const { data, loading } = useContext(UserContext);

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Progress</h2>
        <h4 className="text-xl">View how you are doing in your modules.</h4>
      </div>
      <div className="w-full min-h-full flex flex-col lg:grid lg:grid-cols-3 gap-x-4 gap-y-6">
        <ModuleSelector user={data.currentUser} />
        <SubmitAssignment modules={data.currentUser.modules} />
        <OverallStats modules={data.currentUser.modules} />
        <Assignments modules={data.currentUser.modules} />
      </div>
    </div>
  );
};
