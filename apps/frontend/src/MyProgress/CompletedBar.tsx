import { FC } from "react";
import { PassTypes, scoreColours } from "../utils";

type CompletedBarProps = {
  data: {
    [key: string]: string | number;
  };
  showText?: boolean;
  className?: string;
};

const CompletedBar: FC<CompletedBarProps> = ({ data, showText, className }) => {
  const filteredEntries = Object.entries(data).filter(
    ([key]) => key in PassTypes
  ) as [PassTypes, number][];
  return (
    <div className={`w-full bg-black h-10 flex ${className}`}>
      {filteredEntries.map(([key, value]) => (
        <div
          key={key}
          className="flex-grow flex justify-center align-middle overflow-clip"
          style={{
            width: `${value}%`,
            backgroundColor: scoreColours[key satisfies PassTypes],
          }}
        >
          {showText && (
            <div className="m-auto">
              {key} ({value.toString()}%)
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompletedBar;
