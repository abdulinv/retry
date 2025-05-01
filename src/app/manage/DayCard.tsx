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

  useEffect(() => {
    if (localStorage.getItem("activeTask")) {
      const startedTask = JSON.parse(localStorage.getItem("activeTask")!).task;
      console.log("task local", startedTask);
      if (startedTask) setTaskStart(startedTask);
    }
  }, []);

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
      Math.ceil(new Date().getDate() / 7) == Number(day.title.slice(-1))
        ? "success"
        : "info";
  } else {
    heading = "The Month is";
    headingColor = new Date().getMonth() == day.order+3  ? "success" : "info";
  }
  const sortedTasks = day.tasks.toSorted((a, b) => (a.text > b.text ? 1 : -1));
  const handleStartTask = (text: string) => {
    if (taskStart === text) {
      setTaskStart(null);
      let startTime;
      if (localStorage.getItem("activeTask")) {
        startTime = new Date(
          JSON.parse(localStorage.getItem("activeTask")!).start
        );
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const tasks = day.tasks.filter((item) => item.text !== text);
        const { duration: prevDuration } = day.tasks.filter(
          (item) => item.text === text
        )[0];

        const total =
          ((prevDuration?.hh ?? 0) + hours) * 60 +
          (prevDuration?.mm ?? 0) +
          minutes;
        const prevHH = Math.floor(total / 60);
        const prevMM = total % 60;

        updateTask(`manage${slug}`, day.title, {
          ...day,
          tasks: [
            ...tasks,
            { text: text, status: true, duration: { hh: prevHH, mm: prevMM } },
          ],
        });
        updateWeeklyDuration({ hh: hours, mm: minutes }, text);
      }

      localStorage.setItem(
        "activeTask",
        JSON.stringify({ task: null, start: null })
      );
    } else {
      setTaskStart(text);
      localStorage.setItem(
        "activeTask",
        JSON.stringify({ task: text, start: new Date() })
      );
    }
  };
  return (
    <>
      {headingColor === "success" && (
        <Card
          elevation={headingColor === "success" ? 20 : 5}
          sx={{ opacity: headingColor === "success" ? 1 : 0.7 }}
        >
          <Button fullWidth color={headingColor} variant="contained">
            {heading} - {day.title}
          </Button>
          <CardContent
            sx={{
              maxHeight: "575px",
              minHeight: "575px",
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
                            opacity: 0.8,
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
                            <Typography
                              color={task.status ? "success" : "inherit"}
                            >
                              {task.text}
                            </Typography>
                            { (
                              <Typography color="inherit" fontWeight={600}>
                                {task.duration
                                  ? `${task.duration.hh} hours ${task.duration.mm} minuits`
                                  : "00 hours 00 minuits"}
                              </Typography>
                            )}

                            {slug === "Monthly" && (
                              <Box>
                                <LinearProgress
                                  sx={{
                                    height: 12,
                                    borderRadius: 4,
                                    border: "1px solid grey",
                                  }}
                                  color={
                                    (task.duration?.hh || 0) < 20 
                                      ? "error"
                                      : (task.duration?.hh || 0) < 30
                                      ? "warning"
                                      : "success"
                                  }
                                  variant="determinate"
                                  value={
                                    ((task.duration?.hh || 0) * 60 +
                                      (task.duration?.mm || 0)) /
                                    60
                                  }
                                />

                                {(task.duration?.hh || 0) === 0 && (task.duration?.mm || 0) === 0  && (
                                  <Typography
                                    color="error"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    You are not started this task yet !
                                  </Typography>
                                )}
                                {(task.duration?.hh || 0) > 10  && (task.duration?.hh || 0) < 20 && (
                                  <Typography
                                    color="warning"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    You are making progress...💪 keep going
                                  </Typography>
                                )}
                                {(task.duration?.hh || 0) > 75 && (task.duration?.hh || 0)< 95 && (
                                  <Typography
                                    color="info"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    you made the minimum requirement...💪
                                  </Typography>
                                )}
                                {(task.duration?.hh || 0) > 95 && (task.duration?.hh || 0) < 99 &&(
                                  <Typography
                                    color="success"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    congratulations...✨
                                  </Typography>
                                )}
                                {(task.duration?.hh || 0) > 99 &&  (task.duration?.hh || 0)<49 &&(
                                  <Typography
                                    color="success"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    Excellent...💥💥
                                  </Typography>
                                )}
                                {(task.duration?.hh || 0) > 100 && (
                                  <Typography
                                    color="success"
                                    variant="body2"
                                    fontSize={14}
                                  >
                                    Awesome...🔥🔥🔥 time to switch to another topic
                                  </Typography>
                                )}
                              </Box>
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
                                    {
                                      text: task.text,
                                      status: !task.status,
                                      duration: task.duration,
                                    },
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
                            if (
                              slug === "Monthly" &&
                              value.includes("Daily#-")
                            ) {
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
      )}
    </>
  );
}

export default DayCard;

