import {
  BrandWords,
  namedOperations,
  useAddBrandWordMutation,
  useBrandWordsQuery,
  useCurrentUserQuery,
} from "@wellbeing/graphql-types";
import { FC, useEffect, useState } from "react";
import { AddBrandWords, Card, IBrand } from "./ui";

export const WhoDashboard: FC = () => {
  const { data } = useBrandWordsQuery();
  const { data: userBrandWords, loading } = useCurrentUserQuery();
  console.log(userBrandWords);

  const [addBrandWords] = useAddBrandWordMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [activeBrand, setActiveBrand] = useState<Array<BrandWords>>([]);

  // Is the word cloud currently displaying the active brand, or
  // a past one?
  const [isPastBrand, setIsPastBrand] = useState(false);

  useEffect(() => {
    if (!loading && userBrandWords) {
      setActiveBrand(userBrandWords.currentUser.brand.words);
    }
  }, [loading, userBrandWords]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">Who am I</h2>
        <h4 className="text-xl">
          Here you can view who you are personally and professionally.
        </h4>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6 grid-rows-bigger-dashboard xl:grid-rows-dashboard">
        <Card title="IBrand" className="row-span-2 col-span-2">
          <IBrand
            brandWords={activeBrand}
            isPastBrand={isPastBrand}
            onResetBrand={() => {
              setActiveBrand(userBrandWords?.currentUser.brand.words || []);
              setIsPastBrand(false);
            }}
          />
        </Card>
        <Card
          title="Add Brand Words"
          className="row-span-2 col-span-2 lg:col-span-1"
        >
          <AddBrandWords
            brandWords={data?.brandWords ?? []}
            onAddWord={(id) => {
              addBrandWords({
                variables: {
                  addBrandWord: id,
                },
              });
            }}
          />
        </Card>
        <Card title="Placeholder" className="col-span-3">
          {userBrandWords?.currentUser.brand.pastBrand.map((b) => (
            <button
              type="button"
              key={b.date}
              onClick={() => {
                setActiveBrand(b.words);
                setIsPastBrand(true);
              }}
            >
              {new Date(b.date).toISOString()}
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
};
