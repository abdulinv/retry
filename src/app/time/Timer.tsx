"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { addTime } from "../../../lib/helper";
export default function Timer() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeDifference, setTimeDifference] = useState<string>("00:00:00");
  const [totalHours, setTotalHours] = useState("00 hours:00 minuits");
  const [login, setLogin] = useState(false);
  const [pause, setPause] = useState(false);
  const timerRef = useRef<number>(null);

  useEffect(() => {
    const startTime1 = new Date(
      JSON.parse(localStorage.getItem("date")!)?.date
    );
    const loginStatus = JSON.parse(localStorage.getItem("login")!)?.status
    setLogin(loginStatus)
    
    console.log(startTime1);
    if (startTime1 && loginStatus) {
      timerRef.current = window.setInterval(() => {
        const now = new Date();
        const diffMs = now.getTime() - startTime1.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        setTimeDifference(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
      document.addEventListener("keydown", () => {
        console.log("key is pressed");
      });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const handleLogin = () => {
    setLogin(true);
    localStorage.setItem("login", JSON.stringify({ status: true }));
  };

  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("login", JSON.stringify({ status: false }));
  };
  const startTimer = () => {
    setPause(false);
    localStorage.setItem("date", JSON.stringify({ date: new Date() }));
    setStartTime(new Date());
  };

  const resetTimer = () => {
    setStartTime(null);
    setTimeDifference("00:00:00");
    clearInterval(timerRef.current as number);
    localStorage.setItem(
      "totalhr",
      JSON.stringify({ time: "0 hours 0 minutes" })
    );
    handleLogout();
    storeHours();
    // localStorage.setItem("date", JSON.stringify({ date:null }));
  };

  const storeHours = () => {
    setPause(true);
    const prevHours = JSON.parse(localStorage.getItem("totalhr")!).time;
    clearInterval(timerRef.current as number);
    const endTime = new Date();
    // Parse the times into Date objects
    const start = new Date(JSON.parse(localStorage.getItem("date")!).date);
    const end = endTime;

    // Calculate the difference in milliseconds
    const diffMs = end.getTime() - start.getTime();

    // Convert milliseconds to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const total = addTime(
      prevHours,
      `${diffHours} hours ${diffMinutes} minutes`
    );
    setTotalHours(total);
    console.log("toal hours", total);

    localStorage.setItem("totalhr", JSON.stringify({ time: total }));
  };

  return (
    <Stack flexDirection={"row"} justifyContent={"space-evenly"} gap={16}>
      <Typography
        fontWeight={500}
        letterSpacing={1}
        align="center"
        variant="h5"
      >
        {timeDifference}
      </Typography>
      <Button
        disabled={login}
        size="small"
        variant="contained"
        onClick={() => {
          handleLogin();
          startTimer();
        }}
        color="primary"
      >
        Login
      </Button>
      <Button
        disabled={!login}
        size="small"
        color={pause ? "warning" : "primary"}
        variant="contained"
        onClick={storeHours}
      >
        Break
      </Button>
      <Button
        disabled={!login}
        size="small"
        color={pause ? "success" : "primary"}
        variant="contained"
        onClick={startTimer}
      >
        Resume
      </Button>
      <Button
        disabled={!login}
        size="small"
        color="error"
        variant="contained"
        onClick={resetTimer}
        
      >
        Logout
      </Button>
      <Typography letterSpacing={1} variant="h6">
        {totalHours.toUpperCase()}
      </Typography>
    </Stack>
  );
}
