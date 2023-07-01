import { BrandWords } from "@wellbeing/graphql-types";
import { FC, useEffect, useRef, useState } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import WordCloud from "react-d3-cloud";

interface IBrandProps {
  /** First item of tuple is the ID of the word */
  brandWords: Array<BrandWords>;
  isPastBrand: boolean;

  onResetBrand: () => void;
}

export const IBrand: FC<IBrandProps> = ({
  brandWords,
  isPastBrand,
  onResetBrand,
}) => {
  const wrapper = useRef<HTMLDivElement>(null);

  /** First number is the width, second is the height */
  const [[width, height], setSizes] = useState<[number, number]>([0, 0]);

  const data = brandWords.map((w) => ({
    text: w.word,
    value: 15000 / w.word.length,
  }));

  useEffect(() => {
    if (!wrapper.current) return;

    setSizes([wrapper.current.clientWidth, wrapper.current.clientHeight]);
  }, []);

  return (
    <div ref={wrapper} className="w-full h-full">
      {wrapper.current && (
        <WordCloud
          width={width}
          height={height}
          data={data.length > 0 ? data : [{ text: "No words", value: 10000 }]}
          padding={10}
          random={() => 0.5}
          rotate={() => 0}
          font="sans-serif"
        />
      )}
      {isPastBrand && (
        <button
          type="button"
          className="btn relative -inset-y-24"
          onClick={onResetBrand}
        >
          Reset
        </button>
      )}
    </div>
  );
};
