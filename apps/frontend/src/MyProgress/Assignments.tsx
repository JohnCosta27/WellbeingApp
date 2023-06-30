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

  return (
    <Card title="Assignments" className="col-span-2 row-span-3">
      {modules.map((m) => (
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
  );
};

export default Assignments;
