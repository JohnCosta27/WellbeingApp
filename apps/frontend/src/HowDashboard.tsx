import { FC } from "react";
import {
  namedOperations,
  useAddMentalEnergyMutation,
  useCurrentUserQuery,
  MentalEnergy,
  useHowAmIPhraseQuery,
  useAddHowAmIPhraseMutation,
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
import { Card, MentalEnergy as UIMentalEnergy, WellnessCheck } from "./ui";
import { isToday } from "./isToday";

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
  const { data, loading } = useCurrentUserQuery();

  const words = useHowAmIPhraseQuery();

  const sortedEnergy = !data
    ? []
    : data.currentUser.mentalEnergy
        .slice()
        .sort((a, b) => a.date - b.date)
        .slice(-10);

  const energyAverage = data
    ? getLast7DaysEnergy(data.currentUser.mentalEnergy)
    : 0;

  const lastEnergyTime = data?.currentUser.mentalEnergy.at(-1)?.date || -1;

  const [addMentalEnergy] = useAddMentalEnergyMutation({
    refetchQueries: [namedOperations.Query.CurrentUser],
  });

  const lastWords = !data
    ? []
    : data.currentUser.howAmIPhrase.slice().sort((a, b) => b.date - a.date);

  const leftToSubmit =
    lastWords.length < 3
      ? 3 - lastWords.length
      : Math.max(
          0,
          3 - lastWords.filter((w) => isToday(new Date(w.date))).length
        );

  const [addPhrase] = useAddHowAmIPhraseMutation({
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
          <UIMentalEnergy
            loading={loading}
            energyAverage={energyAverage}
            lastEnergyTime={lastEnergyTime}
            onEnergySubmit={(energy) =>
              addMentalEnergy({
                variables: {
                  level: energy,
                },
              })
            }
          />
        </Card>
        <Card title="Wellness Check" className="row-span-2">
          <WellnessCheck
            lastWords={lastWords.map((w) => w.phrase.phrase)}
            availableWords={
              words.data?.howAmIPhrase.map((v) => [v.id, v.phrase]) || []
            }
            canSubmit={leftToSubmit > 0}
            leftToSubmit={leftToSubmit}
            onSubmitWord={(id) => {
              addPhrase({
                variables: {
                  addHowAmIPhraseId: id,
                },
              });
            }}
          />
        </Card>
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
