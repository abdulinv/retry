import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Timer() {

  const [time, setTime] = useState({
    min: 59,
    seconds: 60,
  });

  useEffect(() => {
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

  return (
    <Box>
      <Typography variant="h4" marginLeft={4}>
        Times Remaining {time.min} : {time.seconds}
      </Typography>
    </Box>
  );
}

export default Timer;
