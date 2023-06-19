import clsx from "clsx";
import { FC } from "react";

interface UserStatsProps {
  // In percent (100% Max)
  sevenDayAverage: number;
  // In percent (100% Max)
  normalAverage: number;
}

export const UserStats: FC<UserStatsProps> = ({
  sevenDayAverage,
  normalAverage,
}) => {
  const energyPercentDiff = getPercentDiff(sevenDayAverage, normalAverage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="stat">
        <div className="stat-title">Energy Average</div>
        <div className="stat-value text-secondary">{normalAverage}%</div>
      </div>

      <div className="stat">
        <div className="stat-title">7 Day Energy Average</div>
        <div className="stat-value text-secondary">{sevenDayAverage}%</div>
        <div
          className={clsx(
            "stat-desc text-lg",
            energyPercentDiff > 0 ? "text-success" : "text-error"
          )}
        >
          {energyPercentDiff > 0 ? "🡥" : "🡧"} {energyPercentDiff}%
        </div>
      </div>
    </div>
  );
};

function getPercentDiff(newValue: number, originalValue: number): number {
  if (originalValue === 0) return 1;
  return ((newValue - originalValue) / originalValue) * 100;
}
