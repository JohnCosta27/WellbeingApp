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

type extractedData = {
  modules: {
    moduleName: string;
    completedScore: number;
    uncompletedAmount: number;
  }[];
  uncompletedAmount: number;
};

type OverallStatsProps = {
  modules: UserModules[] | undefined;
};

const OverallStats = (props: OverallStatsProps) => {
  const { modules } = props;

  /**
   * Extracts the data from the modules to be used in the chart
   */
  const extractData = () => {
    const reduced = modules
      ?.map((module) => {
        const completedScore = module.assignments.reduce(
          (acc, curr) => acc + (curr.score * curr.percent) / 100,
          0
        );

        const uncompletedAmount =
          100 - module.assignments.reduce((acc, curr) => acc + curr.percent, 0);

        return {
          moduleName: module.module.name,
          completedScore,
          uncompletedAmount,
        };
      })
      .reduce(
        (acc, curr) => {
          acc.uncompletedAmount += curr.uncompletedAmount;
          acc.modules.push(curr);
          return acc;
        },
        { modules: [], uncompletedAmount: 0 } as extractedData
      );

    if (!reduced)
      return {
        labels: [],
        datasets: [],
      };
    const chartLabels = reduced.modules.map((module) => module.moduleName);

    const chartDataset = reduced.modules.reduce(
      (acc, curr) => {
        acc.data.push(curr.completedScore);
        acc.backgroundColor.push(
          `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
        );
        return acc;
      },
      { data: [], backgroundColor: [] } as {
        data: number[];
        backgroundColor: string[];
      }
    );

    chartLabels.push("Uncompleted");
    chartDataset.data.push(reduced.uncompletedAmount);
    chartDataset.backgroundColor.push(
      `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
    );

    const outVal = {
      labels: chartLabels,
      datasets: [
        {
          label: "Overall Year 1 Stats",
          data: chartDataset.data,
          backgroundColor: chartDataset.backgroundColor,
          hoverOffset: 4,
        },
      ],
    };

    console.log(outVal);
    return outVal;
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
