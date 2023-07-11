import { PastUserBrand, UserBrand } from "@wellbeing/graphql-types";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { FC } from "react";
import { Card } from "./Card";

dayjs.extend(relativeTime);

type PreviousBrandsProps = {
  userBrand: UserBrand;
  setActiveBrand: (brand: PastUserBrand) => void;
};

const PreviousBrands: FC<PreviousBrandsProps> = (props) => {
  const { userBrand, setActiveBrand } = props;
  return (
    <Card
      title="Your Brands"
      className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-1 w-full col-span-3"
    >
      <button
        type="button"
        className="btn btn-info min-w-fit"
        onClick={() => {
          setActiveBrand({ words: userBrand.words, name: "Current Brand" });
        }}
      >
        Current Brand
      </button>
      {/* If there are any past brands, list them here */}
      {userBrand.pastBrand?.map((b) => (
        <button
          type="button"
          key={b.date}
          className="btn btn-info min-w-fit"
          onClick={() => {
            setActiveBrand(b);
          }}
        >
          {`${b.name}, posted ${dayjs(b.date).fromNow()}`}
        </button>
      ))}
    </Card>
  );
};

export default PreviousBrands;
