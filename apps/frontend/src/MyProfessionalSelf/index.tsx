/* eslint-disable no-restricted-syntax */
import { UserBrands, useCurrentUserQuery } from "@wellbeing/graphql-types";
import { FC, useMemo } from "react";
import { Card } from "../ui";

export const MyProfessionalSelf: FC = () => {
  const { loading, data } = useCurrentUserQuery();

  const topWords: Array<[string, number]> = useMemo(
    () =>
      data?.currentUser.brands
        ? calculateMostUsedBrandWords(data!.currentUser.brands, 5)
        : [],
    [data?.currentUser.brands]
  );

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">My Professional Self</h2>
        <p className="text-xl">A place to see all your data.</p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Your Skills">
          <ul className="p-4">
            {data?.currentUser.skills.map((s) => (
              <li key={s.id} className="list-disc">
                {s.skill}
              </li>
            ))}
          </ul>
        </Card>
        <Card
          title="Brand Words"
          description="A list of your most used brand words."
        >
          <ul className="p-4">
            {topWords.map(([word, number]) => (
              <li key={word} className="list-disc">
                {word} - {number}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

function calculateMostUsedBrandWords(
  brands: Array<UserBrands>,
  topX: number
): Array<[string, number]> {
  const freqMap = new Map<string, number>();

  for (const brand of brands) {
    for (const { word } of brand.words) {
      const num = freqMap.get(word);
      freqMap.set(word, num === undefined ? 1 : num + 1);
    }
  }

  const sortedMap = new Map([...freqMap.entries()].sort((a, b) => b[1] - a[1]));
  return Array.from(sortedMap).slice(0, topX);
}
