import { UserBrands } from "@wellbeing/graphql-types";
import { FC } from "react";
import { Card } from "./Card";

type PreviousBrandsProps = {
  userBrands: UserBrands[];
  setActiveBrand: (brand: UserBrands) => void;
};

const PreviousBrands: FC<PreviousBrandsProps> = ({
  userBrands,
  setActiveBrand,
}) => (
  <Card
    title="Your Brands"
    className="grid md:grid-cols-3 md:gap-4 gap-1 w-full col-span-3"
  >
    {userBrands.map((b) => (
      <button
        type="button"
        key={b.date}
        className="btn btn-info min-w-fit"
        onClick={() => {
          setActiveBrand(b);
        }}
      >
        {b.name}
      </button>
    ))}
  </Card>
);
export default PreviousBrands;
