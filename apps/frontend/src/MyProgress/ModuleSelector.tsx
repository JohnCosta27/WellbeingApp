import {
  Module,
  User,
  namedOperations,
  useAddModuleMutation,
  useModulesQuery,
} from "@wellbeing/graphql-types";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Card } from "../ui";

type ModulesSelectorProps = {
  user?: User;
};

const ModuleSelector = (props: ModulesSelectorProps) => {
  const { user } = props;

  const modulesRetrived = useModulesQuery();

  const [modulesList, setModulesList] = useState<Module[]>([]);

  const [selectedModules, setSelectedModules] = useState<Module[]>([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!modulesRetrived.data) return;
    const newList = modulesRetrived.data?.modules as Module[];
    setModulesList(newList);
  }, [modulesRetrived]);

  const filteredModules =
    query === ""
      ? modulesList
      : modulesList.filter((module) =>
          module.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const [addModule] = useAddModuleMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

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
      className="col-span-2"
    >
      <Combobox value={selectedModules} onChange={setSelectedModules} multiple>
        <Combobox.Input
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
          placeholder="Search for your modules"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className="mt-2 bg-white rounded-md shadow-lg max-h-60 w-full overflow-auto focus:outline-none">
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
      <div className="grid grid-cols-4 gap-4 mt-4">
        {selectedModules.map((module) => (
          <div key={module.id} className="btn btn-info">
            <span>{module.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ModuleSelector;
