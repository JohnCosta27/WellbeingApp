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
    <Card className="min-h-[50vh] col-span-2 row-span-2 gap-4 grid grid-cols-4 grid-rows-3">
      {modules.map((m) => (
        <div className="card bg-base-100 shadow-xl " key={m.module.id}>
          <div className="card-title bg-info p-2 rounded-t-2xl w-full text-center flex justify-center align-middle h-16">
            <div className="m-auto text-base text-ellipsis overflow-hidden whitespace-pre">
              {m.module.name.split(":")[1].trim()}
            </div>
          </div>
          <div className="card-body w-full p-0">
            {m.assignments.length > 0 && (
              <div className="w-full bg-info-content text-white p-2">
                Average:{" "}
                {m.assignments.reduce((a, b) => a + b.score, 0) /
                  m.assignments.length}
                %
              </div>
            )}
            <ul className="p-2">
              {m.assignments.map((a) => (
                <li key={a.date}>
                  {a.name} | {a.score} - {a.percent}% of module
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
