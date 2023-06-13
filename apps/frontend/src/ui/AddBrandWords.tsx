import {
  BrandWords,
  namedOperations,
  useAddWholeBrandMutation,
} from "@wellbeing/graphql-types";
import { FC } from "react";

interface AddBrandWordsProps {
  /** First element of tuple is the ID of the word */
  brandWords: Array<BrandWords>;

  onAddWord: (wordId: string) => void;
}

export const AddBrandWords: FC<AddBrandWordsProps> = ({
  brandWords,
  onAddWord,
}) => {
  const [addWholeBrandMutation] = useAddWholeBrandMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 gap-2 auto-rows-min overflow-y-auto">
        {brandWords.map((w) => (
          <button
            key={w.id}
            type="button"
            className="rounded bg-primary shadow-md h-12 text-xl"
            onClick={() => onAddWord(w.id)}
          >
            {w.word}
          </button>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="btn mt-auto"
          onClick={() => addWholeBrandMutation()}
        >
          Save Brand
        </button>
      </div>
    </div>
  );
};
