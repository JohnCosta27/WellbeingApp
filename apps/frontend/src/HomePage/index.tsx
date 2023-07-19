/* eslint-disable no-restricted-syntax */
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserBrands } from "@wellbeing/graphql-types";
import { UserContext } from "../DashboardLayout";
import { Card, SIX_HOURS } from "../ui";
import OverallStats from "../MyProgress/OverallStats";
import { recentMentalEnergy } from "../utils";
import { YourStats } from "../HowDashboard/YourStats";

const HomePage = () => {
  const { data, loading } = useContext(UserContext);

  const topWords: Array<[string, number]> = useMemo(
    () =>
      data?.currentUser.brands
        ? calculateMostUsedBrandWords(data!.currentUser.brands, 5)
        : [],
    [data?.currentUser.brands]
  );

  if (loading || !data) return <div>Loading...</div>;

  const lastEnergySubmitted = data?.currentUser.mentalEnergy.reduce(
    (acc, curr) => (acc.date > curr.date ? acc : curr)
  );

  const sortedEnergy = recentMentalEnergy(data?.currentUser);

  const nextEnergySubmit = lastEnergySubmitted.date + SIX_HOURS;

  return (
    <div className="grid">
      <Card className="row-span-1" title={`Hi ${data?.currentUser.first_name}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col card bg-primary p-5">
            <div className="m-auto p-4 text-6xl card-title text-center align-middle">
              🔋
            </div>
            <div className="flex-1 m-auto p-2">
              {nextEnergySubmit < Date.now() ? (
                <>
                  You can submit your energy levels now! You last submitted them{" "}
                </>
              ) : (
                <>You can submit your energy levels again in </>
              )}
            </div>
            {nextEnergySubmit < Date.now() && (
              <Link to="/how" className="m-auto">
                <button className="btn btn-secondary" type="button">
                  Click here to submit them now!
                </button>
              </Link>
            )}
          </div>
          <OverallStats
            modules={data.currentUser.modules}
            className="col-span-2 shadow-none"
            title="Overall Academic Progress"
          />
        </div>
      </Card>
      <div className="flex">
        <Card
          title="Your stats"
          className="col-span-2 lg:col-span-1 shadow-none"
        >
          <YourStats sortedEnergy={sortedEnergy} />
        </Card>
        <div className="col-span-2 lg:col-span-1 shadow-none bg-white p-5">
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {data.currentUser.skills.map((skill) => (
              <div className="bg-primary p-2 rounded-2xl" key={skill.id}>
                {skill.skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card
        title="Brand Words"
        description="A list of your most used brand words."
      >
        <ul className="p-4">
          {topWords.map(([word, number]) => (
            <li key={word} className="list-disc">
              {word} - {number}
            </li>
          ))}
        </ul>
      </Card>

      {/* <Card className="row-span-1" title="Your Current Active Brand">
         	TODO: this laggs out the page for some reason? <IBrand brandWords={data.currentUser.brand.words} /> 
      </Card> */}
    </div>
  );
};

function calculateMostUsedBrandWords(
  brands: Array<UserBrands>,
  topX: number
): Array<[string, number]> {
  const freqMap = new Map<string, number>();

  for (const brand of brands) {
    for (const { word } of brand.words) {
      const num = freqMap.get(word);
      freqMap.set(word, num === undefined ? 1 : num + 1);
    }
  }

  const sortedMap = new Map([...freqMap.entries()].sort((a, b) => b[1] - a[1]));
  return Array.from(sortedMap).slice(0, topX);
}

export default HomePage;
