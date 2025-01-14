
import { ReactElement, useEffect, useState } from "react";


interface TimerProps{
  onFinish:(time:{min:number,seconds:number})=>ReactElement,

}
function Timer({onFinish}:TimerProps) {

  const [time, setTime] = useState({
    min: 2,
    seconds: 15,
  });

  useEffect(() => {
    setTime({min:2,seconds:15})
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev.min === 0 && prev.seconds === 0) {
          console.log("clearing");
          clearInterval(id);
          return { seconds: 0, min: 0 };
        }
        if (prev.seconds === 0) {
          return { seconds: 60, min: prev.min - 1 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return onFinish(time)
}

export default Timer;
