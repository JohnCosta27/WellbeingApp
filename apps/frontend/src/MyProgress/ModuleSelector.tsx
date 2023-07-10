import {
  Module,
  User,
  namedOperations,
  useAddModuleMutation,
  useRemoveModuleMutation,
  useModulesQuery,
} from "@wellbeing/graphql-types";
import { Combobox } from "@headlessui/react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui";

type ModulesSelectorProps = {
  user?: User;
};

const ModuleSelector = (props: ModulesSelectorProps) => {
  // these are the mutations used to add and remove modules from the user's list
  const [addModule] = useAddModuleMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });
  const [removeModule] = useRemoveModuleMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const { user } = props;

  // modulesRetrived is the data retrieved from the server, modulesList stores it in a type-safe way
  const modulesRetrived = useModulesQuery();
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [userLoaded, setUserLoaded] = useState(false);

  // selectedModules is the modules that the user has selected, oldSelectedModules is used to compare the old and new states
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const oldSelectedModules = useRef<Module[]>([]);

  // this is the query that the user has entered into the search bar
  const [query, setQuery] = useState("");

  useEffect(() => {
    // set selectedModules to the user modules when the user is loaded
    if (user?.modules) {
      setSelectedModules(user.modules.map((userModule) => userModule.module));
      setUserLoaded(true);
    }
  }, [user]);

  /**
   * This sets the modulesList state to the modules retrieved from the server, when they are retrieved
   */
  useEffect(() => {
    if (!modulesRetrived.data) return;
    const newList = modulesRetrived.data?.modules as Module[];
    setModulesList(newList);
  }, [modulesRetrived]);

  /**
   * This is used to add and remove modules from the user's list
   * It is called whenever the selectedModules state changes, and compares the old and new states
   */
  useEffect(() => {
    if (!userLoaded) return;

    if (oldSelectedModules.current.length < selectedModules.length) {
      const newModule = selectedModules.filter(
        (module) => !oldSelectedModules.current.includes(module)
      )[0];
      addModule({ variables: { moduleId: newModule.id } });
    } else if (oldSelectedModules.current.length > selectedModules.length) {
      const removedModule = oldSelectedModules.current.filter(
        (module) => !selectedModules.includes(module)
      )[0];
      removeModule({ variables: { moduleId: removedModule.id } });
    }
    oldSelectedModules.current = selectedModules;
  }, [selectedModules]);

  /**
   * This is used to filter the modulesList state based on the query state
   */
  const filteredModules =
    query.length < 3
      ? modulesList
      : modulesList.filter((module) =>
          module.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  /**
   * If the user's data is loading, display a loading message
   */
  if (!user) {
    return (
      <Card title="Modules" description="Loading" className="cursor-wait">
        <p>Loading</p>
      </Card>
    );
  }

  return (
    <Card
      title="Modules"
      description="Click to add module to your list"
      className="col-span-1 row-span-1 min-h-fit"
    >
      {/* @ts-ignore */}
      <Combobox value={selectedModules} onChange={setSelectedModules} multiple>
        <Combobox.Input
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2"
          placeholder="Search for your modules"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className="mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none z-10">
          {filteredModules.length === 0 && query !== "" ? (
            <div className="py-2 px-4 text-gray-700">Nothing found.</div>
          ) : (
            filteredModules.map((module) => (
              <Combobox.Option
                key={module.id}
                className={({ active }) =>
                  `cursor-default select-none py-2 pl-4 pr-10 ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                  }`
                }
                value={module}
              >
                {/* @ts-ignore */}
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {module.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-teal-600"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {selectedModules.map((module) => (
          <div
            key={module.id}
            className="bg-info p-2 rounded-md flex items-center"
          >
            <span className="flex-1">{module.name}</span>
            <XCircleIcon
              className="right-2 h-8 w-8 cursor-pointer"
              onClick={() =>
                setSelectedModules(
                  selectedModules.filter((x) => x.id !== module.id)
                )
              }
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ModuleSelector;
