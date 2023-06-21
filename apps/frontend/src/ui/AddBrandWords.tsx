import {
  BrandWords,
  namedOperations,
  useAddWholeBrandMutation,
} from "@wellbeing/graphql-types";
import { FC, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

interface AddBrandWordsProps {
  /** First element of tuple is the ID of the word */
  brandWords: Array<BrandWords>;

  onAddWord: (wordId: string) => void;
}

/**
 * The Add Brand Words card.
 * This allows the user to search and add new brand words to their 'ibrand'.
 */
export const AddBrandWords: FC<AddBrandWordsProps> = ({
  brandWords,
  onAddWord,
}) => {
  const [addWholeBrandMutation] = useAddWholeBrandMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  // sets the brand word to the first word in the list
  const [selectedWords, setSelectedWords] = useState<Set<BrandWords>>(
    new Set([brandWords[0]])
  );

  // the query string for the search
  const [query, setQuery] = useState("");

  // the filtered list of words, based on the query
  const filteredBrands =
    query === ""
      ? brandWords
      : brandWords.filter((w) =>
          w.word
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  /**
   * Toggles the selected state of a word.
   */
  const setSelected = (w: Set<BrandWords>) => {
    const newSelectedWords = new Set(w);
    w.forEach((word) => {
      if (newSelectedWords.has(word)) {
        newSelectedWords.delete(word);
      } else {
        newSelectedWords.add(word);
      }
    });

    setSelectedWords(newSelectedWords);
  };

  return (
    <div className="w-full">
      <Combobox value={selectedWords} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(w) => (w as BrandWords).word}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {brandWords.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                // TODO: the active state is not working, need to allow multiple selections
                filteredBrands.map((w) => (
                  <Combobox.Option
                    key={w.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={w}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {w.word}
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
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export const AddBrandWordsOld: FC<AddBrandWordsProps> = ({
  brandWords,
  onAddWord,
}) => {
  const [addWholeBrandMutation] = useAddWholeBrandMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  return (
    <div className="h-full grid gap-2 grid-cols-1">
      <div className="grid grid-cols-2 gap-2 auto-rows-min overflow-y-auto">
        {brandWords.map((w) => (
          <button
            key={w.id}
            type="button"
            className="btn btn-primary"
            onClick={() => onAddWord(w.id)}
          >
            {w.word}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-secondary w-full"
        onClick={() => addWholeBrandMutation()}
      >
        Save Brand
      </button>
    </div>
  );
};
