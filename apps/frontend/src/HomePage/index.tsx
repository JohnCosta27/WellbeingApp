/* eslint-disable react/no-array-index-key */
import { useContext } from "react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { UserContext } from "../DashboardLayout";
import { Card, IBrand, SIX_HOURS } from "../ui";
import OverallStats from "../MyProgress/OverallStats";
import { recentMentalEnergy } from "../utils";
import { YourStats } from "../HowDashboard/YourStats";

dayjs.extend(relativeTime);

const HomePage = () => {
  const { data, loading } = useContext(UserContext);

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
                  {dayjs(nextEnergySubmit).fromNow()}.
                </>
              ) : (
                <>
                  You can submit your energy levels again in{" "}
                  {dayjs(nextEnergySubmit).fromNow()}
                </>
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
        <Card
          title="Your Skills"
          className="col-span-2 lg:col-span-1 shadow-none"
        >
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {data.currentUser.skills.map((skill, i) => (
              <div className="bg-primary p-2 rounded-2xl" key={i}>{skill.skill}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* <Card className="row-span-1" title="Your Current Active Brand">
         	TODO: this laggs out the page for some reason? <IBrand brandWords={data.currentUser.brand.words} /> 
      </Card> */}
    </div>
  );
};

export default HomePage;
