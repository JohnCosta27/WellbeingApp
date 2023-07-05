import { scoreColours } from "../utils";

type CompletedBarProps = {
  data: {
    [key: string]: string | number;
  };
  showText?: boolean;
  className?: string;
};

const CompletedBar = (props: CompletedBarProps) => {
  const { data, showText, className } = props;
  return (
    <div className={`w-full bg-black h-10 flex ${className}`}>
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="flex-grow flex justify-center align-middle overflow-clip"
          style={{
            width: `${value}%`,
            // @ts-ignore
            backgroundColor: scoreColours[key],
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
