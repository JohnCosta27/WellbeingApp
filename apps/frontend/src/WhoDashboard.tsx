import { useBrandWordsQuery } from "@wellbeing/graphql-types";
import { FC } from "react";
import { Card, IBrand } from "./ui";

export const WhoDashboard: FC = () => {
  const { data } = useBrandWordsQuery();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">Who am I</h2>
        <h4 className="text-xl">
          Here you can view who you are personally and professionally.
        </h4>
      </div>
      <div
        className="w-full grid grid-cols-3 gap-x-4 gap-y-6"
        style={{
          gridTemplateRows: "repeat(3, 28vh)",
        }}
      >
        <Card title="IBrand" className="row-span-2 col-span-2">
          <IBrand brandWords={data?.brandWords ?? []} />
        </Card>
        <Card title="Add Brand Words" className="row-span-2"></Card>
        <Card title="Placeholder" className="col-span-3" />
      </div>
    </div>
  );
};
