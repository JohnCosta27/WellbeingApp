import { FC, useEffect, useState } from "react";

const ONE_SECOND = 1000;

export const Countdown: FC<{ time: number }> = ({ time }) => {
  const [counter, setCounter] = useState(time);

  useEffect(() => {
    let timerRef: NodeJS.Timer | undefined;

    function handleTimer() {
      timerRef = setInterval(() => {
        setCounter((c) => c - ONE_SECOND);
      }, ONE_SECOND);
    }

    if (time > 0 && !timerRef) {
      handleTimer();
    }

    return () => {
      clearInterval(timerRef);
    };
  }, []);

  return (
    <span className="countdown font-mono text-2xl flex justify-center">
      <span style={{ "--value": new Date(counter).getHours() - 1 }}></span>h
      <span style={{ "--value": new Date(counter).getMinutes() }}></span>m
      <span style={{ "--value": new Date(counter).getSeconds() }}></span>s
    </span>
  );
};
