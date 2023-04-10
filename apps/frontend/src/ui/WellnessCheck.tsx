import { HowAmIPhrase, UserHowAmIPhrase } from "@wellbeing/graphql-types";
import clsx from "clsx";
import { FC } from "react";
import { timeUntilEndOfDay } from "../isToday";
import { Countdown } from "./Countdown";

interface WellnessCheckProps {
  lastWords: Array<UserHowAmIPhrase>;
  /** First parameter is the ID of the word, used for submitting */
  availableWords: Array<HowAmIPhrase>;

  leftToSubmit: number;
  onSubmitWord: (wordId: string) => void;
}

export const WellnessCheck: FC<WellnessCheckProps> = ({
  lastWords,
  availableWords,
  leftToSubmit,
  onSubmitWord,
}) => {
  const canSubmit = leftToSubmit > 0;
  return (
    <>
      <span className="font-bold">Last 3 words</span>
      <ul className="list-disc px-4">
        {lastWords.slice(0, 3).map((w) => (
          <li key={w.phrase.id}>{w.phrase.phrase}</li>
        ))}
      </ul>
      <hr className="my-4" />
      <span className="text-lg">Most popular phrases</span>
      <div className="grid grid-cols-3 gap-x-1 gap-y-2">
        {availableWords.map((w) => (
          <button
            type="button"
            key={w.id}
            className={clsx(
              "cursor-pointer rounded shadow-sm p-2 ",
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
      <button
        type="button"
        className="mt-2 btn btn-sm btn-secondary btn-outline"
      >
        View all phrases
      </button>
      {canSubmit && <span>Click to add how you are feeling</span>}
      {canSubmit && (
        <div className="flex justify-between items-center text-xl">
          <span className="font-bold">Phrases left: </span>
          <span className="text-secondary">{leftToSubmit}</span>
        </div>
      )}

      {!canSubmit && (
        <>
          <h3 className="text-center my-2 text-xl">
            Time left until next words
          </h3>
          <Countdown time={timeUntilEndOfDay()} />
        </>
      )}

      <button type="button" className="w-full btn btn-secondary mt-auto">
        View past entries
      </button>
    </>
  );
};
