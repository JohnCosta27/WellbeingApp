import { BrandWords } from "@wellbeing/graphql-types";
import { FC } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import WordCloud from "react-d3-cloud";

interface IBrandProps {
  /** First item of tuple is the ID of the word */
  brandWords: Array<BrandWords>;
}

export const IBrand: FC<IBrandProps> = ({ brandWords }) => {
  const data = brandWords.map((w) => ({
    text: w.word,
    value: 1000,
  }));
  return <WordCloud data={data} rotate={() => 0} font="sans-serif" />;
};
