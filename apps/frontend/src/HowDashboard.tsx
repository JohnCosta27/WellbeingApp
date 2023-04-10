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
    : data.currentUser.mentalEnergy.slice().sort((a, b) => a.date - b.date).slice(-10);

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
  }, [timeTo])

  const [addMentalEnergy] = useAddMentalEnergyMutation({
    variables: {
      level: energyLevel / RANGE_MAX,
    },
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

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
        <div className="w-full flex justify-center items-center px-16">
          <div className="w-full max-w-2xl flex flex-col justify-center gap-4">
            <h2 className="text-4xl">How you feeling?</h2>
            {timeTo < 0 ? 
            (
<>
            <input
              type="range"
              className="range range-accent"
              max={RANGE_MAX}
              min={0}
              step={1}
              value={energyLevel}
              onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            />
            <p className="text-accent text-2xl">
              {getMessage(energyLevel / RANGE_MAX)}
            </p>
            <button
              className="btn btn-accent text-base-300 text-2xl"
              onClick={() => addMentalEnergy()}
            >
              Submit Energy
            </button>
</>
            ) : (
            <>
            <h2 className="text-center text-2xl">You can add another entry in</h2>
<span className="countdown font-mono text-2xl flex justify-center">
  <span style={{"--value": new Date(timeTo).getHours() - 1 }}></span>h
  <span style={{"--value": new Date(timeTo).getMinutes() }}></span>m
  <span style={{"--value": new Date(timeTo).getSeconds()}}></span>s
</span>
            </>
            )
            }
          </div>
        </div>
      </div>
      <div className="w-full flex bg-base-200 rounded-xl shadow-xl p-4">
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
