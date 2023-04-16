import { FC } from "react";
import {
  namedOperations,
  useAddMentalEnergyMutation,
  useCurrentUserQuery,
  MentalEnergy,
  useHowAmIPhraseQuery,
  useAddHowAmIPhraseMutation,
} from "@wellbeing/graphql-types";
import {
  Card,
  EnergyChart,
  MentalEnergy as UIMentalEnergy,
  WellnessCheck,
} from "./ui";
import { isToday } from "./isToday";

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
      <div
        className="w-full grid grid-cols-3 gap-x-4 gap-y-6"
        style={{
          gridTemplateRows: "repeat(3, 28vh)",
        }}
      >
        <Card title="Your stats">
          This is a place to display the average stats
        </Card>
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
            lastWords={lastWords}
            availableWords={words.data?.howAmIPhrase || []}
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
              <EnergyChart
                labels={sortedEnergy.map((m) =>
                  new Date(m.date).toLocaleString()
                )}
                energies={sortedEnergy.map((m) => m.level).slice(0, 10)}
              />
            )}
          </div>
        </Card>
        <Card title="Quick Help">A place to display links for help</Card>
      </div>
    </div>
  );
};

function getLast7DaysEnergy(energies: MentalEnergy[]): number {
  return energies.reduce((p, n) => p + n.level, 0) / energies.length;
}
