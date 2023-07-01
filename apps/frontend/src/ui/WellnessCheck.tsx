import { HowAmIPhrase, UserHowAmIPhrase } from "@wellbeing/graphql-types";
import clsx from "clsx";
import { FC, useState } from "react";
import { timeUntilEndOfDay } from "../utils";
import { Countdown } from "./Countdown";
import { Dialog } from "./Dialog";
import { PhrasesTable } from "./table/PhrasesTable";

interface WellnessCheckProps {
  lastWords: Array<UserHowAmIPhrase>;
  /** First parameter is the ID of the word, used for submitting */
  availableWords: Array<HowAmIPhrase>;
  userWords: Array<UserHowAmIPhrase>;

  leftToSubmit: number;
  onSubmitWords: (wordIds: string[]) => void;
}

export const WellnessCheck: FC<WellnessCheckProps> = ({
  lastWords,
  availableWords,
  userWords,
  leftToSubmit,
  onSubmitWords,
}) => {
  const [openTable, setOpenTable] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const [submittedWords, setSubmittedWords] = useState<string[]>([]);

  const [openHelpLinks, setOpenHelpLinks] = useState(false);

  // const canSubmit = leftToSubmit > 0 && selectedWords.length < 3;
  const canSubmit = (leftToSubmit > 0 && selectedWords.length < 3) || true;
  return (
    <>
      <span className="font-bold">Last 3 words</span>
      <ul className="list-disc px-4">
        {lastWords.slice(0, 3).map((w) => (
          <li key={w.date}>{w.phrase.phrase}</li>
        ))}
      </ul>
      <hr className="my-4" />
      <span className="text-lg">Most popular phrases</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-2 overflow-y-auto h-full auto-rows-min">
        {availableWords.map((w) => (
          <button
            type="button"
            key={w.id}
            className={clsx(
              "cursor-pointer rounded shadow-sm p-2",
              !canSubmit
                ? "bg-neutral-200 hover:bg-neutral-200"
                : "bg-primary hover:bg-primary-focus transition-all",
              selectedWords.includes(w.id)
                ? "bg-primary-focus border-primary-content border-2"
                : "bg-primary border-primary border-0"
            )}
            // @ts-ignore
            {...(!canSubmit && { disabled: true })}
            onClick={() => {
              if (canSubmit) {
                const i = selectedWords.indexOf(w.id);
                if (i > -1) {
                  const copyArray = selectedWords.slice();
                  copyArray.splice(i, 1);
                  setSelectedWords(copyArray);
                } else {
                  setSelectedWords([...selectedWords, w.id]);
                }
              }
            }}
          >
            {w.phrase}
          </button>
        ))}
      </div>
      {canSubmit && <span>Click to add how you are feeling</span>}
      {canSubmit && (
        <button
          type="button"
          className="btn btn-accent my-2"
          onClick={() => {
            setSelectedWords([]);
            onSubmitWords(selectedWords);
            setSubmittedWords(selectedWords);
            setOpenHelpLinks(true);
          }}
        >
          Click to submit
        </button>
      )}

      {!canSubmit && (
        <div className="my-4">
          <p className="text-center">
            You have to wait until you can submit another wellness check.
          </p>
          <Countdown time={timeUntilEndOfDay()} />
        </div>
      )}

      <button
        type="button"
        className="w-full btn btn-secondary mt-auto"
        onClick={() => setOpenTable(true)}
      >
        View past entries
      </button>

      <Dialog
        open={openHelpLinks}
        setOpen={setOpenHelpLinks}
        title="Help links"
        className="w-full md:w-1/2"
      >
        <p>
          We can help you feel better, based on your wellness check, here are
          some useful links
        </p>
        <ul className="list-disc">
          {submittedWords.map((wordId) => (
            <li key={wordId}>
              - {availableWords.find((w) => w.id === wordId)?.phrase ?? ""}:{" "}
              <span className="text-blue-500">A link here</span>
            </li>
          ))}
        </ul>
      </Dialog>

      <Dialog
        open={openTable}
        setOpen={setOpenTable}
        title="Wellness Check Entries"
      >
        <PhrasesTable phrases={userWords} />
      </Dialog>
    </>
  );
};
