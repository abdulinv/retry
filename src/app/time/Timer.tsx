"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { addTime } from "../../../lib/helper";
import { addDocument} from "../../../lib/fetch";
import { Time } from "./types";
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
    const {status:loginStatus,pause:pauseStatus} = JSON.parse(localStorage.getItem("login")!) ?? {status:false,pause:false}
    const totalHours = JSON.parse(localStorage.getItem("totalhr")!)?.time ?? "0 hours 0 minutes";
    setLogin(loginStatus);
    setPause(pauseStatus);
    setTotalHours(totalHours);

    console.log(startTime1);
    if (startTime1 && loginStatus && !pauseStatus) {
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
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const handleLogin = () => {
    setLogin(true);
    localStorage.setItem("login", JSON.stringify({ status: true ,pause:false}));
  };

  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("login", JSON.stringify({ status: false ,pause:true}));
    
  };
  const startTimer = () => {
    setPause(false);
    localStorage.setItem("date", JSON.stringify({ date: new Date() }));
    localStorage.setItem("login", JSON.stringify({ status: true ,pause:false}));
    setStartTime(new Date());
  };

  const resetTimer = () => {
    setStartTime(null);
    setTimeDifference("00:00:00");
    clearInterval(timerRef.current as number);
    handleLogout();
    handleSave();

    // localStorage.setItem("date", JSON.stringify({ date:null }));
  };

  const handleSave = () => {
    const time: Time = storeHours();
    const today = new Date();
    addDocument("times",{
        day: "d",
        week: "w",
        date: today.toDateString(),
        time: time,
      })
    localStorage.setItem("totalhr", JSON.stringify({ time: `0 hours 0 minutes` }));
  };

  const handlePause = ()=>{
    setPause(true);
    storeHours();
    localStorage.setItem("login", JSON.stringify({ status: true ,pause:true}));
  }
  const storeHours = () => {
    
    const prevHours = JSON.parse(localStorage.getItem("totalhr")!)?.time ?? "0 hours 0 minutes";
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
    setTotalHours(`${total.hour} hours ${total.min} minutes`);
    console.log("toal hours", total);

    localStorage.setItem("totalhr", JSON.stringify({ time: `${total.hour} hours ${total.min} minutes` }));
    return { hours: total.hour, minuits: total.min };
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
        disabled={!login || pause }
        size="small"
        color={pause ? "warning" : "primary"}
        variant="contained"
        onClick={handlePause}
      >
        Break
      </Button>
      <Button
        disabled={!login || !pause}
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
