/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  namedOperations,
  useAddAssignmentMutation,
  useCurrentUserQuery,
} from "@wellbeing/graphql-types";
import { FC, useCallback, useState } from "react";
import { Card } from "../ui";
import ModuleSelector from "./ModuleSelector";

export const MyProgress: FC = () => {
  const user = useCurrentUserQuery();

  const [selectedModule, setSelectedModule] = useState<string | undefined>(
    undefined
  );
  const [assignmentScore, setAssignmentScore] = useState(0);
  const [assignmentName, setAssignmentName] = useState<string | undefined>(
    undefined
  );
  const [subError, setSubError] = useState<string | undefined>(undefined);

  const [addAssignment] = useAddAssignmentMutation({
    variables: {
      moduleId: selectedModule || "",
      score: assignmentScore,
      name: assignmentName || "",
    },
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const onSubmitAssignment = useCallback(() => {
    if (assignmentScore < 0 || assignmentScore > 100) {
      setSubError("Assignment score must be a percentage (0 to 100)");
      return;
    }

    if (!selectedModule) {
      setSubError("You must select a module");
      return;
    }

    if (!assignmentName) {
      setSubError("You must give your assignment a name");
      return;
    }

    addAssignment();
  }, [addAssignment, assignmentName, assignmentScore, selectedModule]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Progress</h2>
        <h4 className="text-xl">View how you are doing in your modules.</h4>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6 grid-rows-bigger-dashboard xl:grid-rows-dashboard">

        <Card title="Submit Assignment" className="col-span-2">
          <div className="dropdown" onClick={() => setSubError(undefined)}>
            <label tabIndex={0} className="btn m-1">
              {/** lol */}
              {!selectedModule
                ? "Select Module"
                : user.data?.currentUser.modules.find(
                    (m) => m.module.id === selectedModule
                  )?.module.name || "Select Module"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user.data?.currentUser.modules.map((m) => (
                <li
                  key={m.module.id}
                  onClick={() => setSelectedModule(m.module.id)}
                >
                  <a>{m.module.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <label className="label" htmlFor="score-input">
            <span className="label-text">Score</span>
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="99%"
            min={0}
            max={100}
            type="number"
            id="score-input"
            value={assignmentScore}
            onFocus={() => setSubError(undefined)}
            onChange={(e) => setAssignmentScore(parseFloat(e.target.value))}
          />
          <label className="label" htmlFor="name-input">
            <span className="label-text">Assignment Name</span>
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="99%"
            id="name-input"
            value={assignmentName}
            onFocus={() => setSubError(undefined)}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
          {subError && <span>{subError}</span>}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSubmitAssignment}
          >
            Submit Assignment
          </button>
        </Card>
        <ModuleSelector user={user.data?.currentUser} />
        <Card title="Assignments" className="col-span-2 row-span-3">
          {user.data &&
            user.data.currentUser.modules.map((m) => (
              <div key={m.module.id}>
                <h2 className="text-lg">{m.module.name}</h2>
                <ul>
                  {m.assignments.map((a) => (
                    <li key={a.date}>
                      {a.name} | {a.score}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </Card>
      </div>
    </div>
  );
};
