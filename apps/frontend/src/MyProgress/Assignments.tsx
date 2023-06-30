/* eslint-disable react/no-array-index-key */
import { UserModules } from "@wellbeing/graphql-types";
import { Card } from "../ui";

type AssignmentsProps = {
  modules: UserModules[] | undefined;
};

const Assignments = (props: AssignmentsProps) => {
  const { modules } = props;

  if (!modules) {
    return (
      <Card title="Assignments" className="col-span-2 row-span-3">
        Loading...
      </Card>
    );
  }

  if (modules.length === 0) {
    return (
      <Card title="Assignments" className="flex justify-center align-middle">
        <div className="">You have no chosen modules yet.</div>
      </Card>
    );
  }

  return (
    <Card className="col-span-2 row-span-3 gap-4 grid grid-cols-4 grid-rows-3">
      {modules.map((m, i) => (
        <div className="card bg-base-100 shadow-xl " key={i}>
          <div className="card-title m-auto bg-info p-2 rounded-t-2xl">
            {m.module.name}
          </div>
          <div className="card-body">
            <ul>
              {m.assignments.map((a) => (
                <li key={a.date}>
                  {a.name} | {a.score}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Assignments;
