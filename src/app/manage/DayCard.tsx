"use client";

import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Card,
  CardContent,
  ListItemText,
  Checkbox,
  CardActionArea,
  Button,
  TextField,
  useTheme,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

interface Day {
  day: {
    id?: number;
    category?: string;
    title: string;
    order: number;
    tasks: {
      text: string;
      status: boolean;
      duration?: {
        hh: number;
        mm: number;
      };
    }[];
  };
  autoUpdateDaily: (value: string) => void;
  updateWeeklyDuration: (duration: Duration, text: string) => void;
}

import { useParams } from "next/navigation";
import { updateTask } from "../../../lib/fetch";
import { Duration } from "@/models/checklist/daily/daily";

function DayCard({ day, autoUpdateDaily, updateWeeklyDuration }: Day) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [taskStart, setTaskStart] = useState<null | string>(null);
  const { slug } = useParams();
  const theme = useTheme();

   useEffect(()=>{
    if(localStorage.getItem('activeTask')){
      const startedTask = JSON.parse(localStorage.getItem("activeTask")!).task;
      console.log("task local",startedTask);
      if(startedTask) setTaskStart(startedTask);
    }
   
   },[]);


  let heading: string;
  let headingColor: "info" | "success" = "info";
  if (slug === "Daily") {
    heading =
      "Today is " +
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Sataurday",
      ][Number(day.title.slice(-1)) - 1];
    headingColor =
      new Date().getDay() + 1 == Number(day.title.slice(-1))
        ? "success"
        : "info";
  } else if (slug === "Weekly") {
    heading = "The Week is";
    headingColor =
      Math.floor(new Date().getDate() / 7) == Number(day.title.slice(-1))
        ? "success"
        : "info";
  } else {
    heading = "The Month is";
    headingColor = "success";
  }
  const sortedTasks = day.tasks.toSorted((a, b) => (a.text > b.text ? 1 : -1));
  const handleStartTask = (text: string) => {
   
    if (taskStart === text) {
      setTaskStart(null);
      let startTime;
      if (localStorage.getItem("activeTask")) {
        startTime = new Date(JSON.parse(localStorage.getItem("activeTask")!).start);
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const tasks = day.tasks.filter((item) => item.text !== text);
        const prevDuration = day.tasks.filter(item=>item.text === text)[0].duration;
        updateTask(`manage${slug}`, day.title, {
          ...day,
          tasks: [
            ...tasks,
            { text: text, status: true, duration: { hh: (prevDuration?.hh || 0) + hours, mm:(prevDuration?.mm || 0) + minutes} },
          ],
        });
        updateWeeklyDuration({ hh: hours, mm: minutes }, text);
      }

      localStorage.setItem("activeTask", JSON.stringify({task:null,start:null}));
    } else {
      setTaskStart(text);
      localStorage.setItem("activeTask", JSON.stringify({task:text,start:new Date()}));
    }
  };
  return (
    <Card
      elevation={headingColor === "success" ? 20 : 5}
      sx={{ opacity: headingColor === "success" ? 1 : 0.7 }}
    >
      <Button fullWidth color={headingColor} variant="contained">
        {heading} - {day.title}
      </Button>
      <CardContent
        sx={{
          maxHeight: "300px",
          minHeight: "300px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sortedTasks.map((task, i) => {
            return (
              <ListItem key={i}>
                <ListItemText
                  onDoubleClick={() => {
                    setShowInput(task.text);
                    setValue(task.text);
                  }}
                >
                  {showInput !== task.text && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4,
                        border: "1px solid grey",
                        padding: 2,
                        borderRadius: 3,
                        color: "white",
                        opacity:0.8,
                        backgroundColor:
                          taskStart === task.text
                            ? theme.palette.success.light
                            : "black",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexGrow: 1,
                          flexDirection: "column",
                          gap: 1,
                          color: "white",
                        }}
                      >
                        <Typography color= {task.status ? "success":"inherit"}>{task.text}</Typography>
                        {slug !== "Monthly" && <Typography color="inherit" fontWeight={600}>
                          {task.duration
                            ? `${task.duration.hh} hours ${task.duration.mm} minuits`
                            : "00 hours 00 minuits"}
                        </Typography>}
                        
                        {slug === "Weekly" && 
                        (
                         <LinearProgress  
                          sx={{
                            height:12,
                            borderRadius:4,
                            border:"1px solid grey"
                          }}
                          color={task.duration?.hh || 0<20?"error":task.duration?.hh || 0<30?"warning":"success"}
                          variant="determinate" value={ ( ((task.duration?.hh || 0) * 60) +
                          (task.duration?.mm || 0))/24} />
                        )}
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: "white",
                          borderRadius: 2,
                        }}
                      >
                        {slug === "Daily" && (
                          <Button
                            disabled={slug !== "Daily"}
                            color="primary"
                            onClick={() => handleStartTask(task.text)}
                          >
                            {taskStart === task.text ? "end" : "start"}
                          </Button>
                        )}

                        <Checkbox
                          color="success"
                          checked={task.status}
                          onClick={() => {
                            const tasks = day.tasks.filter(
                              (item) => item.text !== task.text
                            );
                            updateTask(`manage${slug}`, day.title, {
                              ...day,
                              tasks: [
                                ...tasks,
                                { text: task.text, status: !task.status ,duration:task.duration},
                              ],
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  {showInput === task.text && (
                    <TextField
                      value={value}
                      autoFocus
                      size="small"
                      fullWidth
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={() => {
                        const tasks = day.tasks.filter(
                          (item) => item.text !== task.text
                        );
                        updateTask(`manage${slug}`, day.title, {
                          ...day,
                          tasks: [
                            ...tasks,
                            { text: value, status: task.status },
                          ],
                        });
                        if (slug === "Monthly" && value.includes("Daily#-")) {
                          autoUpdateDaily(value);
                        }
                        setShowInput(null);
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none", // Remove the default border
                          },
                          "&:hover fieldset": {
                            border: "none", // Prevent border on hover
                          },
                          "&.Mui-focused fieldset": {
                            border: "none", // Prevent border on focus
                          },
                        },
                      }}
                    />
                  )}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActionArea>
        <Button
          onClick={() => {
            updateTask(`manage${slug}`, day.title, {
              ...day,
              tasks: [...day.tasks, { text: "add here", status: false }],
            });
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            updateTask(`manage${slug}`, day.title, {
              ...day,
              tasks: [],
            });
          }}
        >
          reset
        </Button>
      </CardActionArea>
    </Card>
  );
}

export default DayCard;
