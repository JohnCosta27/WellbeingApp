import { useCallback, useState } from "react";
import {
  UserModules,
  namedOperations,
  useAddAssignmentMutation,
} from "@wellbeing/graphql-types";
import { Card } from "../ui";

type SubmitAssignmentProps = {
  modules: UserModules[] | undefined;
};

const SubmitAssignment = (props: SubmitAssignmentProps) => {
  const { modules } = props;
  const [subError, setSubError] = useState<string | undefined>(undefined);
  const [selectedModule, setSelectedModule] = useState<string | undefined>(
    undefined
  );
  const [assignmentScore, setAssignmentScore] = useState(0);
  const [assignmentName, setAssignmentName] = useState<string | undefined>(
    undefined
  );

  const handleModuleSelect = (module: UserModules) => {
    setSelectedModule(module.module.id);
    const elem = document.activeElement as HTMLElement;
    // check to see if it's a HTMLElement
    if (elem && "blur" in elem) {
      elem?.blur();
    }
  };

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

  if (!modules)
    return (
      <Card
        title="Submit Assignment"
        className="col-span-2 flex align-middle justify-center"
      >
        <div className="m-auto text-2xl">Loading</div>
      </Card>
    );

  return (
    <Card title="Submit Assignment" className=" grid grid-cols-1 gap-2">
      <div className="dropdown flex-1" onClick={() => setSubError(undefined)}>
        <label tabIndex={0} className="btn m-1 w-full">
          {/** lol */}
          {!selectedModule
            ? "Select Module"
            : modules.find((m) => m.module.id === selectedModule)?.module
                .name || "Select Module"}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
        >
          {modules.map((m) => (
            <li key={m.module.id} onClick={() => handleModuleSelect(m)}>
              <a>{m.module.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <label className="label" htmlFor="score-input">
          <span className="label-text">Score</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          placeholder="99%"
          min={0}
          max={100}
          type="number"
          id="score-input"
          value={assignmentScore}
          onFocus={() => setSubError(undefined)}
          onChange={(e) => setAssignmentScore(parseFloat(e.target.value))}
        />
      </div>
      <div className="flex-1">
        <label className="label" htmlFor="name-input">
          <span className="label-text">Assignment Name</span>
        </label>
        <input
          className="input input-bordered input-primary w-full"
          placeholder="The importance of the number 42"
          id="name-input"
          value={assignmentName}
          onFocus={() => setSubError(undefined)}
          onChange={(e) => setAssignmentName(e.target.value)}
        />
      </div>

      {subError && <span>{subError}</span>}
      <button
        type="button"
        className="btn btn-secondary w-full"
        onClick={onSubmitAssignment}
      >
        Submit Assignment
      </button>
    </Card>
  );
};

export default SubmitAssignment;
