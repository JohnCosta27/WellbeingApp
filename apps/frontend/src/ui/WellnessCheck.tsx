import { HowAmIPhrase, UserHowAmIPhrase } from "@wellbeing/graphql-types";
import clsx from "clsx";
import { FC, useState } from "react";
import { timeUntilEndOfDay } from "../isToday";
import { Countdown } from "./Countdown";
import { Dialog } from "./Dialog";
import { PhrasesTable } from "./table/PhrasesTable";

interface WellnessCheckProps {
  lastWords: Array<UserHowAmIPhrase>;
  /** First parameter is the ID of the word, used for submitting */
  availableWords: Array<HowAmIPhrase>;
  userWords: Array<UserHowAmIPhrase>;

  leftToSubmit: number;
  onSubmitWord: (wordId: string) => void;
}

export const WellnessCheck: FC<WellnessCheckProps> = ({
  lastWords,
  availableWords,
  userWords,
  leftToSubmit,
  onSubmitWord,
}) => {
  const [openTable, setOpenTable] = useState(false);

  const canSubmit = leftToSubmit > 0;
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
                : "bg-primary hover:bg-primary-focus transition-all"
            )}
            {...(!canSubmit && { disabled: true })}
            onClick={() => {
              if (canSubmit) {
                onSubmitWord(w.id);
              }
            }}
          >
            {w.phrase}
          </button>
        ))}
      </div>
      {canSubmit && <span>Click to add how you are feeling</span>}
      {canSubmit && (
        <div className="flex justify-between items-center text-xl">
          <span className="font-bold">Phrases left: </span>
          <span className="text-secondary">{leftToSubmit}</span>
        </div>
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
        open={openTable}
        setOpen={setOpenTable}
        title="Wellness Check Entries"
      >
        <PhrasesTable phrases={userWords} />
      </Dialog>
    </>
  );
};
