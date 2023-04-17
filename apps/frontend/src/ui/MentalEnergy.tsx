import { MentalEnergy as MentalEnergyType } from "@wellbeing/graphql-types";
import { FC, useState } from "react";
import { Countdown, Dialog, MentalEnergyTable } from ".";
import { getMessage } from "./utils";

const RANGE_MAX = 10000;

// Six hours in milliseconds
const SIX_HOURS = 6 * 60 * 60 * 1000;

interface MentalEnergyProps {
  loading: boolean;
  energyAverage: number | undefined;
  lastEnergyTime: number;

  energies: Array<MentalEnergyType>;

  onEnergySubmit: (eneryg: number) => void;
}

export const MentalEnergy: FC<MentalEnergyProps> = ({
  loading,
  energyAverage,
  lastEnergyTime,
  energies,
  onEnergySubmit,
}) => {
  const [energyLevel, setEnergyLevel] = useState(RANGE_MAX / 1.5);
  const [openTable, setOpenTable] = useState(false);

  const canUseNextEnergy = lastEnergyTime + SIX_HOURS - new Date().getTime();

  function getEnergyComponent() {
    if (loading) {
      return <span>Loading...</span>;
    }

    if (canUseNextEnergy < 0) {
      return (
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
          <p className="text-accent text-sm">
            {getMessage(energyLevel / RANGE_MAX)}
          </p>
          <button
            type="button"
            className="w-full btn btn-accent btn-sm btn-outline text-base-300"
            onClick={() => onEnergySubmit(energyLevel / RANGE_MAX)}
          >
            Submit Energy
          </button>
        </>
      );
    }

    return <Countdown time={canUseNextEnergy} />;
  }

  return (
    <>
      {energyAverage && (
        <>
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
            {!loading && getMessage(energyAverage)}
          </p>
        </>
      )}
      <div className="my-2">{getEnergyComponent()}</div>
      <div className="mt-auto w-full">
        <button
          type="button"
          className="w-full btn btn-secondary btn-md"
          onClick={() => setOpenTable(true)}
        >
          View all energy
        </button>
      </div>
      <Dialog
        open={openTable}
        setOpen={setOpenTable}
        title="Mental Energy Table"
      >
        <MentalEnergyTable mentalEnergy={energies} />
      </Dialog>
    </>
  );
};
