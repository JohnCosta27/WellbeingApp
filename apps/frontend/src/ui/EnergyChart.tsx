import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EnergyChartProps {
  labels: Array<string>;
  energies: Array<number>;
}

export const EnergyChart: FC<EnergyChartProps> = ({ labels, energies }) => {
  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Your energy",
        data: energies,
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        scales: {
          y: {
            ticks: {
              callback: chartLabel,
            },
            min: 0,
            max: 1.2,
          },
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.3,
          },
        },
      }}
    />
  );
};

function chartLabel(value: string | number): string | number {
  if (value === 1) {
    return "Awesome";
  }
  if (value === 0) {
    return "Need help";
  }
  if (value > 1) {
    return "";
  }
  return value;
}
