import { FC, useState } from "react";
import { Card, Countdown } from ".";
import { getMessage } from "./utils";

const RANGE_MAX = 10000;

// Six hours in milliseconds
const SIX_HOURS = 6 * 60 * 60 * 1000;

interface MentalEnergyProps {
  loading: boolean;
  energyAverage: number;
  lastEnergyTime: number;

  onEnergySubmit: (eneryg: number) => void;
}

export const MentalEnergy: FC<MentalEnergyProps> = ({
  loading,
  energyAverage,
  lastEnergyTime,
  onEnergySubmit,
}) => {
  const [energyLevel, setEnergyLevel] = useState(RANGE_MAX / 1.5);

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
          <p className="text-accent text-2xl">
            {getMessage(energyLevel / RANGE_MAX)}
          </p>
          <button
            type="button"
            className="btn btn-accent text-base-300 text-2xl"
            onClick={() => onEnergySubmit(energyLevel)}
          >
            Submit Energy
          </button>
        </>
      );
    }

    return <Countdown time={canUseNextEnergy} />;
  }

  return (
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
        {!loading && getMessage(energyAverage)}
      </p>
      {getEnergyComponent()}
      <div className="mt-auto w-full">
        <button type="button" className="w-full btn btn-secondary btn-md">
          View all energy
        </button>
      </div>
    </Card>
  );
};
