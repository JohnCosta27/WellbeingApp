import { BrandWords, PastUserBrand } from "@wellbeing/graphql-types";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { FC } from "react";
import { Card } from "./Card";

dayjs.extend(relativeTime);

type PreviousBrandsProps = {
  pastBrands: PastUserBrand[] | undefined;
  setActiveBrand: (words: BrandWords[]) => void;
  setIsPastBrand: (isPastBrand: boolean) => void;
};

const PreviousBrands: FC<PreviousBrandsProps> = (props) => {
  const { pastBrands, setActiveBrand, setIsPastBrand } = props;
  return (
    <Card
      title="Previous Brands"
      className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-1 w-full col-span-3"
    >
      {/* If there are any past brands, list them here */}
      {pastBrands?.map((b, i) => (
        <button
          type="button"
          key={b.date}
          className="btn btn-info min-w-fit"
          onClick={() => {
            setActiveBrand(b.words);
            setIsPastBrand(true);
          }}
        >
          {`Brand ${i + 1}, posted ${dayjs(b.date).fromNow()}`}
        </button>
      ))}
    </Card>
  );
};

export default PreviousBrands;
