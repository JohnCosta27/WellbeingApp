import { UserModules } from "@wellbeing/graphql-types";
import { useEffect, useState } from "react";
import { Card } from "../ui";
import {
  extractedData,
  getColours,
  reduceModules,
  scaleModuleOverallScore,
  scoreColours,
} from "../utils";
import CompletedBar from "./CompletedBar";
import { DoughnutChart } from "./DoughnutChart";

type OverallStatsProps = {
  modules: UserModules[] | undefined;
  showBarText?: boolean;
  className?: string;
};

const OverallStats = (props: OverallStatsProps) => {
  const { modules, showBarText, className } = props;
  const [reducedModules, setReducedModules] = useState<
    extractedData | undefined
  >(modules ? reduceModules(modules) : undefined);

  useEffect(() => {
    if (modules) setReducedModules(reduceModules(modules));
  }, [modules]);

  /**
   * Extracts the data from the modules to be used in the chart
   */
  const getChartData = () => {
    // extracts the completed and uncompleted data from the modules
    if (!modules)
      return {
        labels: [],
        datasets: [],
      };

    // if there are no modules, return an empty chart
    if (!reducedModules)
      return {
        labels: [],
        datasets: [],
      };

    // Create the chart labels and dataset
    const chartLabels = reducedModules.modules.map(
      (module) => module.moduleName
    );
    const chartDataset = reducedModules.modules.map(
      (module) => module.completedScore
    );

    // push the general stats to the arrays
    chartLabels.push("Uncompleted");
    chartDataset.push(reducedModules.uncompletedAmount);
    chartLabels.push("Failed");
    chartDataset.push(reducedModules.failedScore);

    const bgColours = getColours(chartDataset.length - 2);

    bgColours.push(scoreColours.Uncompleted);
    bgColours.push(scoreColours.Failed);

    // scale the chartDataset to be out of 100
    const total = chartDataset.reduce((acc, curr) => acc + curr, 0);
    chartDataset.forEach((_, i) => {
      chartDataset[i] = Math.round((chartDataset[i] / total) * 100);
    });

    return {
      labels: chartLabels,
      datasets: [
        {
          label: "%",
          data: chartDataset,
          backgroundColor: bgColours,
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

  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-title bg-info p-2 rounded-t-2xl w-full text-center flex justify-center align-middle h-16">
        <div className="m-auto text-2xl">Overall Stats</div>
      </div>
      {reducedModules && (
        <CompletedBar
          showText={showBarText}
          data={scaleModuleOverallScore(reducedModules)}
        />
      )}

      <DoughnutChart data={getChartData()} />
    </div>
  );
};

export default OverallStats;
