import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  data: ChartData<"doughnut">;
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
      align: "start",
    },
  },
};

export const DoughnutChart: FC<DoughnutChartProps> = ({ data }) => (
  <div className="h-80 w-full m-auto">
    <Doughnut data={data} options={options} />
  </div>
);

// export default DoughnutChart;
