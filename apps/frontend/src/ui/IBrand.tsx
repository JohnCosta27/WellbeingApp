import { BrandWords } from "@wellbeing/graphql-types";
import { FC, useRef } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import WordCloud from "react-d3-cloud";

interface IBrandProps {
  /** First item of tuple is the ID of the word */
  brandWords: Array<BrandWords>;
}

export const IBrand: FC<IBrandProps> = ({ brandWords }) => {
  const wrapper = useRef<HTMLDivElement>(null);

  const data = brandWords.map((w) => ({
    text: w.word,
    value: 1000,
  }));

  const boundingRect = wrapper.current?.getBoundingClientRect();

  return (
    <div ref={wrapper} className="w-full h-full">
      <WordCloud
        width={boundingRect?.width || 0}
        height={boundingRect?.height || 0}
        data={data}
        rotate={() => 0}
        font="sans-serif"
      />
    </div>
  );
};
