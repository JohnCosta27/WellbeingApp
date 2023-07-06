/* eslint-disable react/no-array-index-key */
import { UserModules } from "@wellbeing/graphql-types";
import { Card } from "../ui";
import CompletedBar from "./CompletedBar";
import { reduceModules, scaleModuleOverallScore } from "../utils";

type AssignmentsProps = {
  modules: UserModules[] | undefined;
};

const parentStyle =
  "min-h-[50vh] col-span-3 row-span-2 gap-4 grid grid-cols-1 lg:grid-cols-4 grid-rows-3";

const Assignments = (props: AssignmentsProps) => {
  const { modules } = props;

  if (!modules) {
    return (
      <Card title="Assignments" className={parentStyle}>
        Loading...
      </Card>
    );
  }

  if (modules.length === 0) {
    return (
      <Card title="Assignments" className={parentStyle}>
        <div className="">You have no chosen modules yet.</div>
      </Card>
    );
  }

  return (
    <Card className={parentStyle}>
      {modules.map((m) => (
        <div className="card bg-base-100 shadow-xl " key={m.module.id}>
          <div className="card-title bg-info rounded-t-2xl w-full text-center flex flex-col justify-center align-middle h-16">
            <div className="m-auto text-base text-ellipsis overflow-hidden whitespace-pre p-2">
              {m.module.name.split(":")[1].trim()}
            </div>
            <CompletedBar
              data={scaleModuleOverallScore(reduceModules([m]))}
              className="h-6"
            />
          </div>
          <div className="card-body w-full p-0 max-h-52 overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className=" rounded-t-none">Name</th>
                  <th>Score</th>
                  <th className=" rounded-t-none">% of Module</th>
                </tr>
              </thead>
              <tbody>
                {m.assignments.map((a) => (
                  <tr key={a.date}>
                    <td>
                      {a.name.trim().length > 20
                        ? `${a.name.trim().slice(0, 20)}...`
                        : a.name.trim()}
                    </td>
                    <td>{a.score}</td>
                    <td>{a.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Assignments;
