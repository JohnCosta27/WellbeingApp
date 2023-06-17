import { BrandWords, PastUserBrand } from "@wellbeing/graphql-types";
import { Card } from "./Card";
import { FC } from "react";

type PreviousBrandsProps = {
	pastBrands:  PastUserBrand[] | undefined;
	setActiveBrand: (words: BrandWords[]) => void;
	setIsPastBrand: (isPastBrand: boolean) => void;
};

const PreviousBrands = (props: PreviousBrandsProps) => {
	const { pastBrands, setActiveBrand, setIsPastBrand } = props;
	return (
		<Card title="Previous Brands" className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-1 w-full col-span-3">
			{/* If there are any past brands, list them here */}
			{pastBrands?.map((b) => (
				<button
					type="button"
					key={b.date}
					className="btn btn-info min-w-fit"
					onClick={() => {
						setActiveBrand(b.words);
						setIsPastBrand(true);
					}}
				>
					{new Date(b.date!).toISOString()}
				</button>
			))}
		</Card>
	);
};

export default PreviousBrands;
