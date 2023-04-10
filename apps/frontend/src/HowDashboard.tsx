import { FC, useEffect, useState } from "react";
import {
  MentalEnergy,
  namedOperations,
  useAddMentalEnergyMutation,
  useCurrentUserQuery,
} from "@wellbeing/graphql-types";
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
} from "chart.js";
import { Card } from "./ui";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RANGE_MAX = 10000;

// Six hours in milliseconds
const SIX_HOURS = 6 * 60 * 60 * 1000;

export const HowDashboard: FC = () => {
  const { data } = useCurrentUserQuery();

  const sortedEnergy = !data
    ? []
    : data.currentUser.mentalEnergy
        .slice()
        .sort((a, b) => a.date - b.date)
        .slice(-10);

  const energyAverage = data
    ? getLast7DaysEnergy(data.currentUser.mentalEnergy)
    : 0;

  const [timeTo, setTimeTo] = useState(0);

  const [energyLevel, setEnergyLevel] = useState(RANGE_MAX / 1.5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeTo < 0) {
        clearInterval(interval);
        return;
      }
      if (data && data.currentUser.mentalEnergy.length > 0) {
        setTimeTo(sortedEnergy.at(-1)!.date + SIX_HOURS - new Date().getTime());
      }
    }, 1000);
  }, [timeTo]);

  const [addMentalEnergy] = useAddMentalEnergyMutation({
    variables: {
      level: energyLevel / RANGE_MAX,
    },
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <h2 className="text-3xl font-bold">How are you?</h2>
        <h4 className="text-xl">
          Where you can see your past activity and let us know how you are
          feeling
        </h4>
      </div>
      <div className="w-full grid grid-cols-3 gap-x-4 gap-y-6">
        <Card title="Mental Energy">
          <div className="w-full flex justify-between">
            <span className="font-bold">Last 7 Days:</span>
            <span className="text-secondary text-bold text-lg">
              {Math.floor(energyAverage * 100)}%
            </span>
          </div>
          <div className="w-full flex justify-between">
            <span className="font-bold">Average:</span>
            <span className="text-secondary text-bold text-lg">
              {Math.floor(energyAverage * 100)}%
            </span>
          </div>
          <p className="text-md text-info-content">
            {data && getMessage(energyAverage)}
          </p>
          {timeTo < 0 ? (
            <>
              <input
                type="range"
                className="range range-accent"
                max={RANGE_MAX}
                min={0}
                step={1}
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value, 10))}
              />
              <p className="text-accent text-2xl">
                {getMessage(energyLevel / RANGE_MAX)}
              </p>
              <button
                type="button"
                className="btn btn-accent text-base-300 text-2xl"
                onClick={() => addMentalEnergy()}
              >
                Submit Energy
              </button>
            </>
          ) : (
            <div>
              <p className="text-xl text-center mt-2">Next Energy Level</p>
              <span className="countdown font-mono text-2xl flex justify-center">
                <span
                  style={{ "--value": new Date(timeTo).getHours() - 1 }}
                ></span>
                h
                <span
                  style={{ "--value": new Date(timeTo).getMinutes() }}
                ></span>
                m
                <span
                  style={{ "--value": new Date(timeTo).getSeconds() }}
                ></span>
                s
              </span>
            </div>
          )}
          <div className="mt-4 w-full">
            <button type="button" className="w-full btn btn-secondary btn-md">
              View all energy
            </button>
          </div>
        </Card>
        <Card className="row-span-2" />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="w-full flex bg-white rounded-xl shadow-xl p-4">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-2">
            <p className="text-3xl">Last 7 Days</p>
            <Battery energy={energyAverage} />
            <p className="text-2xl text-info-content">
              {data && getMessage(energyAverage)}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center px-16">
          <div className="w-full max-w-2xl flex flex-col justify-center gap-4">
            <h2 className="text-4xl">How you feeling?</h2>
            {timeTo < 0 ? (
              <>
                <input
                  type="range"
                  className="range range-accent"
                  max={RANGE_MAX}
                  min={0}
                  step={1}
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(parseInt(e.target.value, 10))}
                />
                <p className="text-accent text-2xl">
                  {getMessage(energyLevel / RANGE_MAX)}
                </p>
                <button
                  type="button"
                  className="btn btn-accent text-base-300 text-2xl"
                  onClick={() => addMentalEnergy()}
                >
                  Submit Energy
                </button>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl">
                  You can add another entry in
                </h2>
                <span className="countdown font-mono text-2xl flex justify-center">
                  <span
                    style={{ "--value": new Date(timeTo).getHours() - 1 }}
                  ></span>
                  h
                  <span
                    style={{ "--value": new Date(timeTo).getMinutes() }}
                  ></span>
                  m
                  <span
                    style={{ "--value": new Date(timeTo).getSeconds() }}
                  ></span>
                  s
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex bg-white rounded-xl shadow-sm p-4"></div>
      <div className="w-full flex bg-white rounded-xl shadow-sm p-4">
        <div className="w-full h-[40vh]">
          {data && (
            <Line
              data={{
                labels: sortedEnergy.map((m) =>
                  new Date(m.date).toLocaleString()
                ),
                datasets: [
                  {
                    label: "Your energy",
                    data: sortedEnergy.map((m) => m.level).slice(0, 10),
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0.3,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface BatteryProps {
  energy: number;
}

export const Battery: FC<BatteryProps> = ({ energy }) => (
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

function getPastelColor(percent: number, transparancy: number) {
  const formatPercent = Math.min(100, Math.max(0, percent));

  const red = Math.round(202 - (75 * formatPercent) / 100);
  const green = Math.round(127 + (99 * formatPercent) / 100);
  const blue = Math.round(127 - (25 * formatPercent) / 100);

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
  return energies.reduce((p, n) => p + n.level, 0) / energies.length;
}
