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

// Returns a tuple with the first one being the borderColor, and second backgroundColor
function getColours(average: number): [string, string] {
  if (average > 0.7) {
    return ["#7EFA6B", "#ACFAA0"];
  }
  if (average > 0.5) {
    return ["#FAE73E", "#FCEF7C"];
  }
  return ["#DE5E47", "#FA8C78"];
}

interface EnergyChartProps {
  labels: Array<string>;
  energies: Array<number>;
  average: number;
}

export const EnergyChart: FC<EnergyChartProps> = ({
  labels,
  energies,
  average,
}) => {
  const [borderColor, backgroundColor] = getColours(average);
  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Your energy",
        data: energies,
        borderColor,
        backgroundColor,
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
