import { FC } from "react";
import { MentalEnergy, useCurrentUserQuery } from "@wellbeing/graphql-types";
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const HowDashboard: FC = () => {
  const { data } = useCurrentUserQuery();

  const energyAverage = data
    ? getLast7DaysEnergy(data.currentUser.mentalEnergy)
    : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex bg-base-200 rounded-xl shadow-xl p-4">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-4xl">How Am I?</h2>
            <p className="text-3xl">Last 7 Days</p>
            <Battery energy={energyAverage} />
            <p className="text-2xl text-info-content">
              {data && getMessage(energyAverage)}
            </p>
          </div>
        </div>
      </div>
        <div className="w-full flex bg-base-200 rounded-xl shadow-xl p-4">
          {data && (
            <Line
              data={{
                labels: data.currentUser.mentalEnergy.map((m) =>
                  new Date(m.date).toLocaleString()
                ).slice(0, 10),
                datasets: [
                  {
                    label: "Your energy",
                    data: data.currentUser.mentalEnergy.map((m) => m.level).slice(0, 10),
                  },
                ],
              }}
              options={
                {
                  elements: {
                    line: {
                      tension: 0.3, 
                    }
                  }
                }
              }
            />
          )}
        </div>
    </div>
  );
};

interface BatteryProps {
  energy: number;
}

export const Battery: FC<BatteryProps> = ({ energy }) => {
  return (
    <div
      className="rounded shadow-md w-full h-2"
      style={{
        backgroundColor: getPastelColor(energy * 100, 0.2),
      }}
    >
      <div
        className="h-full"
        style={{
          backgroundColor: getPastelColor(energy * 100, 1),
          width: `${energy * 100}%`,
        }}
      />
    </div>
  );
};

function getPastelColor(percent: number, transparancy: number) {
  percent = Math.min(100, Math.max(0, percent));

  const red = Math.round(202 - (75 * percent) / 100);
  const green = Math.round(127 + (99 * percent) / 100);
  const blue = Math.round(127 - (25 * percent) / 100);

  return `rgba(${red}, ${green}, ${blue}, ${transparancy})`;
}

function getMessage(percent: number): string {
  if (percent > 0.75) {
    return "Looks like you are doing great!";
  }

  if (percent > 0.5) {
    return "Doing Ok, keep going!";
  }

  if (percent > 0.25) {
    return "Not your best days, but we can help if you need!";
  }

  return "Please let us help, see these links";
}

function getLast7DaysEnergy(energies: MentalEnergy[]): number {
  return energies.reduce((p, n) => (p += n.level), 0) / energies.length;
}
