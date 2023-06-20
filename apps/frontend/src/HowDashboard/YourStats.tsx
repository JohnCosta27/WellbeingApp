import { MentalEnergy } from "@wellbeing/graphql-types";
import { getLast7DaysEnergy } from "../utils/misc";
import React, { ReactNode } from "react";
import { TbMathAvg } from 'react-icons/tb';
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import {AiOutlineCalendar} from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { getMessage } from "../ui/utils";

type YourStatsProps = {
	sortedEnergy: MentalEnergy[];
}

type StatCardProps = {
  children: ReactNode;
	icon?: React.JSX.Element;
}

const StatCard = (props: StatCardProps) => (
	<div className="badge-primary badge flex justify-center align-middle h-fit">
		<div className="h-10 w-10 my-auto mx-3">
			{props.icon}
		</div>
		{props.children}
	</div>
);

export const YourStats = (props: YourStatsProps) => {
	const {sortedEnergy} = props;

	return (
			<div className="grid gap-3 grid-flow-row">
				<StatCard icon={<AiOutlineCalendar className="w-full h-full" />}>
					Energy Levels Submitted: {sortedEnergy.length}.
				</StatCard>
				<StatCard icon={<HiOutlineEmojiHappy className="h-full w-full"/>}>
					Good Days: {sortedEnergy.filter((e) => e.level > 0.5).length}.
				</StatCard>
				<StatCard icon={<TbMathAvg className="h-full w-full"/>}>
					{/* Ceil > floor, to stay positive! */}
					Average Last Week: {Math.ceil(getLast7DaysEnergy(sortedEnergy)*100)}%
				</StatCard>
				<StatCard icon={<BiMessageRounded className="h-full w-full"/>}>
					{getMessage(getLast7DaysEnergy(sortedEnergy))} 
				</StatCard>
			</div>
	)
};