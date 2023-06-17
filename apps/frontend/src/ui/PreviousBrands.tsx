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
		<Card title="Placeholder" className="col-span-3">
			{/* If there are any past brands, list them here */}
			{pastBrands?.map((b) => (
				<button
					type="button"
					key={b.date}
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
