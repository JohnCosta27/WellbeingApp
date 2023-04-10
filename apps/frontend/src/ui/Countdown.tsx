import { FC, useEffect, useRef, useState } from "react";

const ONE_SECOND = 1000;

export const Countdown: FC<{ time: number }> = ({ time }) => {
  const [counter, setCounter] = useState(time);
  const timerRef = useRef<NodeJS.Timer | undefined>();

  useEffect(() => {
    function handleTimer() {
      timerRef.current = setInterval(() => {
        setCounter(counter - ONE_SECOND);
      }, ONE_SECOND);
    }

    if (time > 0) {
      handleTimer();
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [counter]);

  return (
    <span className="countdown font-mono text-2xl flex justify-center">
      <span style={{ "--value": new Date(counter).getHours() - 1 }}></span>h
      <span style={{ "--value": new Date(counter).getMinutes() }}></span>m
      <span style={{ "--value": new Date(counter).getSeconds() }}></span>s
    </span>
  );
};
