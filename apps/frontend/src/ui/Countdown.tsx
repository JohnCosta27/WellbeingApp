import { FC, useEffect, useRef, useState } from "react";

const ONE_SECOND = 1000;

export const Countdown: FC<{ time: number }> = ({ time }) => {
  console.log(time);
  const [counter, setCounter] = useState(time);
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    function handleTimer() {
      timerRef.current = setInterval(() => {
        setCounter((c) => c - ONE_SECOND);
      }, ONE_SECOND);
    }

    if (counter > 0 && !timerRef.current) {
      handleTimer();
    }
  }, [counter]);

  return (
    <span className="countdown font-mono text-2xl flex justify-center">
      <span
        style={{ "--value": new Date(counter).getHours() - 1 } as any}
      ></span>
      h
      <span style={{ "--value": new Date(counter).getMinutes() } as any}></span>
      m
      <span style={{ "--value": new Date(counter).getSeconds() } as any}></span>
      s
    </span>
  );
};
