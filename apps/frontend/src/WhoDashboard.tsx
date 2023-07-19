import {
  namedOperations,
  useAddBrandWordMutation,
  useRemoveBrandWordMutation,
  useBrandWordsQuery,
  UserBrands,
} from "@wellbeing/graphql-types";
import { FC, useContext, useEffect, useState } from "react";
import { AddBrandWords, Card, IBrand } from "./ui";
import PreviousBrands from "./ui/PreviousBrands";
import { UserContext } from "./DashboardLayout";

export const WhoDashboard: FC = () => {
  const { data } = useBrandWordsQuery();
  // This is using the userContext from DashboardLayout.tsx
  const { data: userBrandWords, loading } = useContext(UserContext);

  const [addBrandWords] = useAddBrandWordMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [removeBrandWords] = useRemoveBrandWordMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const [activeBrand, setActiveBrand] = useState<UserBrands>({
    words: [],
    name: "Active Brand",
    id: "",
  });

  useEffect(() => {
    if (!loading && userBrandWords) {
      const active = userBrandWords.currentUser.brands.find((b) => !b?.date);
      setActiveBrand({
        date: undefined,
        words: active?.words || [],
        name: "Active Brand",
        id: active?.id || "",
      });
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
          <div className="w-full text-center font-bold text-xl">
            {activeBrand.date ? (
              <>
                {activeBrand.name} from:{" "}
                {new Date(activeBrand.date).toDateString()}
              </>
            ) : (
              <>Active Brand </>
            )}
          </div>
          <IBrand brandWords={activeBrand.words} />
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
            onRemoveWord={(id) => {
              removeBrandWords({
                variables: {
                  removeBrandWord: id,
                },
              });
            }}
            activeBrand={activeBrand}
          />
        </Card>
        {userBrandWords?.currentUser.brands && (
          <PreviousBrands
            userBrands={userBrandWords.currentUser.brands}
            setActiveBrand={setActiveBrand}
          />
        )}
      </div>
    </div>
  );
};
