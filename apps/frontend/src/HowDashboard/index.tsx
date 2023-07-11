import { FC, useContext } from "react";
import {
  namedOperations,
  useAddMentalEnergyMutation,
  useCurrentUserQuery,
  useHowAmIPhraseQuery,
  useAddHowAmIPhraseMutation,
} from "@wellbeing/graphql-types";
import {
  Card,
  EnergyChart,
  MentalEnergy as UIMentalEnergy,
  WellnessCheck,
} from "../ui";

import { QuickHelp } from "../MyProgress/QuickHelp";
import { YourStats } from "./YourStats";
import { getLast7DaysEnergy, isToday, recentMentalEnergy } from "../utils";
import { UserContext } from "../DashboardLayout";

export const HowDashboard: FC = () => {
  const { data, loading } = useContext(UserContext);

  const words = useHowAmIPhraseQuery();

  const sortedEnergy = recentMentalEnergy(data?.currentUser);

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
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6">
        <Card title="Your stats" className="col-span-2 lg:col-span-1">
          <YourStats sortedEnergy={sortedEnergy} />
        </Card>
        <Card
          title="Mental Energy"
          className="col-span-2 lg:col-span-1"
          description="Update your mental energy every 6 hours"
        >
          <UIMentalEnergy
            loading={loading}
            energyAverage={energyAverage}
            lastEnergyTime={lastEnergyTime}
            energies={data?.currentUser.mentalEnergy ?? []}
            onEnergySubmit={(energy) =>
              addMentalEnergy({
                variables: {
                  level: energy,
                },
              })
            }
          />
        </Card>
        <Card
          title="Wellness Check"
          description="A way to describe your wellbeing using common words, you can add 3 of them every day, and we'll help you by providing resources that may help."
          className="row-span-2 col-span-2 lg:col-span-1"
        >
          <WellnessCheck
            lastWords={lastWords}
            availableWords={words.data?.howAmIPhrase || []}
            userWords={data?.currentUser.howAmIPhrase || []}
            leftToSubmit={leftToSubmit}
            onSubmitWords={(wordIds) => {
              wordIds.forEach((id) => {
                addPhrase({
                  variables: {
                    addHowAmIPhraseId: id,
                  },
                });
              });
            }}
          />
        </Card>
        <Card
          title="Energy Level Graph"
          className="row-span-2 col-span-2 overflow-x-auto h-[50vh]"
        >
          <div className="w-full h-full min-w-[700px] min-h-[50vh]">
            {data && (
              <EnergyChart
                labels={sortedEnergy.map((m) =>
                  new Date(m.date).toLocaleString()
                )}
                energies={sortedEnergy.map((m) => m.level).slice(0, 10)}
                average={energyAverage || 1}
              />
            )}
          </div>
        </Card>
        <QuickHelp />
      </div>
    </div>
  );
};
