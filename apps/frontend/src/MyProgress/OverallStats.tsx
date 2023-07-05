import { UserModules } from "@wellbeing/graphql-types";
import { Card } from "../ui";
import DoughnutChart from "./DoughnutChart";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

type OverallStatsProps = {
  modules: UserModules[] | undefined;
};

const OverallStats = (props: OverallStatsProps) => {
  const { modules } = props;

  if (!modules) {
    return (
      <Card title="Overall Stats" className="col-span-1 row-span-1">
        Loading...
      </Card>
    );
  }

  if (modules.length === 0) {
    return (
      <Card title="Overall Stats" className="flex justify-center align-middle">
        <div className="">
          Here&apos;s where your stats will be when you fill in your progress!
        </div>
      </Card>
    );
  }

  // on module re-render, destroy the chart and re-render it

  return (
    <div className="card bg-base-100 shadow-xl ">
      <div className="card-title bg-info p-2 rounded-t-2xl w-full text-center flex justify-center align-middle h-16">
        <div className="m-auto text-2xl">Overall Stats</div>
      </div>
      <DoughnutChart data={data} />
    </div>
  );
};

export default OverallStats;
