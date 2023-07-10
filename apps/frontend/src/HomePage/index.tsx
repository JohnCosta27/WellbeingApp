import { useContext } from "react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { UserContext } from "../DashboardLayout";
import { Card, SIX_HOURS } from "../ui";

dayjs.extend(relativeTime);

const HomePage = () => {
  const { data, loading } = useContext(UserContext);

  if (loading || !data) return <div>Loading...</div>;

  const lastEnergySubmitted = data?.currentUser.mentalEnergy.reduce(
    (acc, curr) => (acc.date > curr.date ? acc : curr)
  );

  const nextEnergySubmit = lastEnergySubmitted.date + SIX_HOURS;

  return (
    <div className="grid grid-rows-dashboard">
      <Card
        className="row-span-1"
        title={`Hi ${data?.currentUser.first_name}!`}
      >
        <div className="flex">
          <div className="m-auto p-4 text-6xl">🔋</div>
          <div className="flex-1 m-auto">
            {nextEnergySubmit < Date.now() ? (
              <>
                You can submit your energy levels now! You last submitted them{" "}
                {dayjs(nextEnergySubmit).fromNow()}.
              </>
            ) : (
              <>
                You have not submitted your energy levels for today. You can
                submit your energy levels again in{" "}
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
      </Card>
    </div>
  );
};

export default HomePage;
