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

/**
 * The Add Brand Words card.
 * TODO: turn this into a combo box https://headlessui.com/react/combobox
 */
export const AddBrandWords: FC<AddBrandWordsProps> = ({
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
