import { FC, useEffect, useState } from "react";
import { Statistic } from "antd";

interface TimeCounterProps {
  isStart: boolean;
  isGameOver: boolean;
  gameResult: string;
  setGameResult: (s: string) => void;
}

const TimeCounter: FC<TimeCounterProps> = ({
  isStart,
  isGameOver,
  gameResult,
  setGameResult,
}) => {
  const [timeInMillis, setTimeInMillis] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isStart && !isGameOver) {
      timer = setInterval(() => {
        setTimeInMillis((prevTime) => prevTime + 10);
      }, 10);
    }

    if (isGameOver) {
      const totalSeconds = Math.floor(timeInMillis / 1000);
      const hundredths = Math.floor((timeInMillis % 1000) / 10);
      setGameResult(
        `${String(totalSeconds).padStart(1, "0")}.${String(hundredths).padStart(
          2,
          "0"
        )}`
      );

      if (timer) {
        clearInterval(timer);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStart, isGameOver, timeInMillis, setGameResult]);

  const totalSeconds = Math.floor(timeInMillis / 1000);
  const hundredths = Math.floor((timeInMillis % 1000) / 10);

  return (
    <div>
      {isStart ? (
        <>
          <Statistic
            value={`${String(totalSeconds).padStart(1, "0")}.${String(
              hundredths
            ).padStart(2, "0")}`}
          />
          {isGameOver && <div>Final Time: {gameResult}</div>}
        </>
      ) : (
        <div>Game not started</div>
      )}
    </div>
  );
};

export default TimeCounter;
