import clsx from "clsx";
import { FC } from "react";
import { timeUntilEndOfDay } from "../isToday";
import { Countdown } from "./Countdown";

interface WellnessCheckProps {
  lastWords: string[];
  /** First parameter is the ID of the word, used for submitting */
  availableWords: Array<[string, string]>;

  canSubmit: boolean;
  leftToSubmit: number;
  onSubmitWord: (wordId: string) => void;
}

export const WellnessCheck: FC<WellnessCheckProps> = ({
  lastWords,
  availableWords,
  canSubmit,
  leftToSubmit,
  onSubmitWord,
}) => (
  <>
    <span className="font-bold">Last 3 words</span>
    <ul className="list-disc px-4">
      {lastWords.slice(0, 3).map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
    <hr className="my-4" />
    <div className="grid grid-cols-3 gap-x-1 gap-y-2">
      {availableWords.map(([id, word]) => (
        <button
          type="button"
          key={id}
          className={clsx(
            "cursor-pointer rounded  shadow-sm bg-primary p-2 hover:bg-primary-focus transition-all",
            !canSubmit && "bg-neutral-200 hover:bg-neutral-200"
          )}
          disabled={canSubmit}
          onClick={() => onSubmitWord(id)}
        >
          {word}
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
      <>
        <h3 className="text-center my-2 text-xl">Time left until next words</h3>
        <Countdown time={timeUntilEndOfDay()} />
      </>
    )}

    <button type="button" className="w-full btn btn-secondary mt-auto">
      View past entries
    </button>
  </>
);
