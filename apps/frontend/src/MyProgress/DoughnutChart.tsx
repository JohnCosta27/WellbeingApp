import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  data: any;
};

const DoughnutChart = (props: DoughnutChartProps) => {
  const { data } = props;
  return (
    <div className="h-80 w-80 m-auto">
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
