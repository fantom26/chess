import { useState, useEffect } from "react";

interface ChessTimer {
  minutes: number;
  seconds: number;
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

const useChessTimer = (initialMinutes = 15, initialSeconds = 0): ChessTimer => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = (): void => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = (): void => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return {
    minutes,
    seconds,
    isActive,
    toggleTimer,
    resetTimer
  };
};

export default useChessTimer;
