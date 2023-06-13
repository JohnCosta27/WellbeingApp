import {
  namedOperations,
  useAddModuleMutation,
  useCurrentUserQuery,
  useModulesQuery,
} from "@wellbeing/graphql-types";
import { FC } from "react";
import { Card } from "./ui";

export const MyProgress: FC = () => {
  const user = useCurrentUserQuery();
  const modules = useModulesQuery();

  console.log(user.data?.currentUser.modules);

  const [addModule] = useAddModuleMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Progress</h2>
        <h4 className="text-xl">View how you are doing in your modules.</h4>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6 grid-rows-bigger-dashboard xl:grid-rows-dashboard">
        <Card
          title="Modules"
          description="Click to add module to your list"
          className="col-span-2"
        >
          <div className="grid grid-cols-3 gap-2">
            {modules.data &&
              modules.data.modules.map((m) => (
                <button
                  type="button"
                  key={m.name}
                  className="btn"
                  disabled={user.data?.currentUser.modules.some(
                    (userModule) => userModule.module.name === m.name
                  )}
                  onClick={() =>
                    addModule({
                      variables: {
                        moduleId: m.id,
                      },
                    })
                  }
                >
                  {m.name}
                </button>
              ))}
          </div>
        </Card>
        <Card
          title="Submit Assignment"
          className="col-span-1 row-span-3"
        ></Card>
        <Card title="Assignments" className="col-span-2 row-span-3"></Card>
      </div>
    </div>
  );
};
