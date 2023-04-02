import { FC } from "react";

export const HowDashboard: FC = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-base-200 rounded-xl shadow-xl p-4 flex flex-col">
        <div className="w-full flex flex-col">
          <h2 className="text-4xl">How Am I?</h2>
          <Battery energy={0.01} />
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
  // Ensure that percent is a number between 0 and 100
  percent = Math.min(100, Math.max(0, percent));

  const red = Math.round(202 - (75 * percent) / 100);
  const green = Math.round(127 + (99 * percent) / 100);
  const blue = Math.round(127 - (25 * percent) / 100);

  // Return the CSS color string in the format of "rgb(r, g, b)"
  return `rgba(${red}, ${green}, ${blue}, ${transparancy})`;
}
