import { UserModules } from "@wellbeing/graphql-types";
import { Card } from "../ui";
import DoughnutChart from "./DoughnutChart";
import { getColours, reduceModules } from "../utils";

type OverallStatsProps = {
  modules: UserModules[] | undefined;
};

const OverallStats = (props: OverallStatsProps) => {
  const { modules } = props;

  /**
   * Extracts the data from the modules to be used in the chart
   */
  const extractData = () => {
    // extracts the completed and uncompleted data from the modules
    if (!modules)
      return {
        labels: [],
        datasets: [],
      };

    const reduced = reduceModules(modules);

    // if there are no modules, return an empty chart
    if (!reduced)
      return {
        labels: [],
        datasets: [],
      };

    // Create the chart labels and dataset
    const chartLabels = reduced.modules.map((module) => module.moduleName);
    const chartDataset = reduced.modules.map((module) => module.completedScore);

    // push the general stats to the arrays
    chartLabels.push("Uncompleted");
    chartDataset.push(reduced.uncompletedAmount);
    chartLabels.push("Failed");
    chartDataset.push(reduced.failedScore);

    // scale the chartDataset to be out of 100
    const total = chartDataset.reduce((acc, curr) => acc + curr, 0);
    chartDataset.forEach((_, i) => {
      chartDataset[i] = (chartDataset[i] / total) * 100;
    });

    return {
      labels: chartLabels,
      datasets: [
        {
          label: "%",
          data: chartDataset,
          backgroundColor: getColours(chartDataset.length),
          hoverOffset: 4,
        },
      ],
    };
  };

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
      <DoughnutChart data={extractData()} />
    </div>
  );
};

export default OverallStats;
