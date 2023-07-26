import {
  BrandWords,
  UserBrands,
  namedOperations,
  useAddWholeBrandMutation,
} from "@wellbeing/graphql-types";
import { FC, Fragment, useState, useEffect, useRef, useContext } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../DashboardLayout";

interface AddBrandWordsProps {
  /** First element of tuple is the ID of the word */
  brandWords: Array<BrandWords>;

  onAddWord: (wordId: string) => void;
  onRemoveWord: (wordId: string) => void;
  activeBrand: UserBrands;
}

/**
 * The Add Brand Words card.
 * This allows the user to search and add new brand words to their 'ibrand'.
 */
export const AddBrandWords: FC<AddBrandWordsProps> = ({
  brandWords,
  onAddWord,
  onRemoveWord,
  activeBrand,
}) => {
  const { data: userBrandWords, loading } = useContext(UserContext);
  const [brandName, setBrandName] = useState("");

  // TODO: when this gets called, the words need to change accordingly
  const [addWholeBrandMutation] = useAddWholeBrandMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
    variables: {
      brandName,
    },
  });

  /** The words that are currently selected
   * Whenever a word is added/removed, this array should be modified
   * instead of calling onAddWord/onRemoveWord
   */
  const [selectedWords, setSelectedWords] = useState<BrandWords[]>([]);

  useEffect(() => {
    if (!loading && userBrandWords) {
      const active = userBrandWords.currentUser.brands.find((b) => !b?.date);
      setSelectedWords(active?.words || []);
    }
  }, [userBrandWords]);

  const prevSelectedWords = useRef<BrandWords[]>([]);

  useEffect(() => {
    // if the selected words have changed, then we need to see which words have been added/removed
    // and then add/remove them from the brand
    if (prevSelectedWords.current.length > selectedWords.length) {
      // a word has been removed
      const removedWord = prevSelectedWords.current.filter(
        (w) => !selectedWords.includes(w)
      )[0];
      onRemoveWord(removedWord.id);
    } else if (prevSelectedWords.current.length < selectedWords.length) {
      // a word has been added
      const addedWord = selectedWords.filter(
        (w) => !prevSelectedWords.current.includes(w)
      )[0];
      onAddWord(addedWord.id);
    }

    prevSelectedWords.current = selectedWords;
  }, [selectedWords]);

  // the query string for the search
  const [query, setQuery] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  if (activeBrand.date) {
    return <div> You can&apos;t edit previous brands!</div>;
  }
  return (
    <div className="w-full h-full relative">
      {/** @ts-ignore Why is multiple not valid and why does this work? */}
      <Combobox value={selectedWords} onChange={setSelectedWords} multiple>
        <div className="relative mt-1 z-10">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="Search for a brand word"
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => buttonRef.current?.click()}
            />
            <Combobox.Button
              className="hidden absolute inset-y-0 right-0 tems-center pr-2"
              ref={buttonRef}
            >
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
                          <div>
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
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
      <div className="grid grid-cols-2 gap-2 auto-rows-min overflow-hidden mt-4">
        {selectedWords.map((w) => (
          <button
            type="submit"
            key={w.id}
            onClick={() =>
              setSelectedWords(selectedWords.filter((x) => x.id !== w.id))
            }
            className="btn-info btn cursor-no-drop"
          >
            {w.word}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4 bottom-0 absolute w-full gap-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Brand Name"
          value={brandName}
          onChange={(event) => setBrandName(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary w-1/3"
          onClick={() => addWholeBrandMutation()}
        >
          Save Brand
        </button>
      </div>
    </div>
  );
};
