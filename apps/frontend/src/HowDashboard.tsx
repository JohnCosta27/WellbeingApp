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
  console.log(data);

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
      <div
        className="w-full grid grid-cols-3 gap-x-4 gap-y-6"
        style={{
          gridTemplateRows: "repeat(3, 350px)",
        }}
      >
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
        <Card title="Place holder" />
        <Card title="Wellness Check" className="row-span-3">
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
        <Card title="Energy Level Graph" className="row-span-2 col-span-2">
          <div className="w-full h-full">
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
                  scales: {
                    y: {
                      ticks: {
                        callback: (value) => {
                          if (value === 1) {
                            return "1 - Feeling Good";
                          }
                          if (value === 0) {
                            return "0 - Need help";
                          }
                          if (value > 1) {
                            return "";
                          }
                          return value;
                        },
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
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

function getLast7DaysEnergy(energies: MentalEnergy[]): number {
  return energies.reduce((p, n) => p + n.level, 0) / energies.length;
}
