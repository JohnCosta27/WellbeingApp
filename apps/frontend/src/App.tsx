import { FC, useCallback, useState } from "react";
import {
  namedOperations,
  useAddHowAmIWordMutation,
  useAddMentalEnergyMutation,
  useCurrentUserQuery,
  useHowAmIWordsQuery,
} from "@wellbeing/graphql-types";

const RANGE_MAX = 10000;

export const App: FC = () => {
  const [energyLevel, setEnergyLevel] = useState(0);

  const { data, loading, error } = useCurrentUserQuery();
  const { data: wordsData, loading: wordsLoading } = useHowAmIWordsQuery();

  const [addMentalEnergy] = useAddMentalEnergyMutation({
    variables: {
      level: energyLevel / RANGE_MAX,
    },
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [addHowAmIWord] = useAddHowAmIWordMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const onAddWord = useCallback(
    (wordId: string) => {
      addHowAmIWord({
        variables: {
          addHowAmIWordId: wordId,
        },
      });
    },
    [addHowAmIWord]
  );

  return (
    <div className="w-full h-full flex justify-center items-center text-5xl gap-8">
      <div className="w-full h-full bg-neutral rounded-xl p-4 flex flex-col gap-4">
        <h1 className="text-base-300 mb-4">Mental Energy</h1>
        {!loading && data && (
          <div className="grid grid-cols-2 gap-4">
            {data.currentUser.mentalEnergy.map((i) => (
              <div key={i.date} className="text-base-300 text-xl">
                {new Date(i.date).toISOString()} - {i.level}
              </div>
            ))}
          </div>
        )}
        {error && <>Error has occured</>}
        <input
          type="range"
          className="range range-primary"
          max={RANGE_MAX}
          min={0}
          step={1}
          value={energyLevel}
          onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
        />
        <button className="btn btn-primary text-base-300 text-2xl" onClick={() => addMentalEnergy()}>
          Submit Energy
        </button>
      </div>
      <div className="w-full h-full bg-neutral rounded-xl p-4 flex flex-col gap-4">
        <h1 className="text-base-300 mb-4">Users How am I words</h1>
        {!loading &&
          data &&
          data.currentUser.howAmIWords.map((w) => (
            <div key={w.id + (w.date ?? Math.random())} className="text-base-300 text-xl">
              {w.word}
              {w.date && <> - Added: {new Date(w.date).toISOString()}</>}
            </div>
          ))}
        {error && <>Error has occured</>}
        <h2 className="text-base-300 mb-4 text-4xl my-4">Available words</h2>
        {!wordsLoading &&
          wordsData &&
          wordsData.howAmIWords.map((w) => (
            <div key={w.id} className="flex justify-between px-16 text-base-300">
              - {w.word}
              <button
                className="btn btn-primary text-2xl"
                onClick={() => onAddWord(w.id)}
              >
                Add Word
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
