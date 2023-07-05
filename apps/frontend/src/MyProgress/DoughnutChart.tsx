import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  data: any;
};

const options: ChartOptions<DoughnutChartProps["data"]> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
      align: "left",
    },
  },
};

const DoughnutChart = (props: DoughnutChartProps) => {
  const { data } = props;
  return (
    <div className="h-80 w-full m-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
