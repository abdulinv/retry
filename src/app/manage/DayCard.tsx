"use client";

import React, { useState } from "react";
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
    }[];
  };
}

import { useParams } from "next/navigation";
import { updateTask } from "../../../lib/fetch";

function DayCard({ day }: Day) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const { slug } = useParams();
  const theme = useTheme();
  console.log("from car", slug);

  let heading: string;

  if (slug === "Daily") {
    heading = "Today is";
  } else if (slug === "Weekly") {
    heading = "The Week is";
  } else {
    heading = "The Month is";
  }
  const sortedTasks = day.tasks.toSorted((a, b) => (a.text > b.text ? 1 : -1));
  return (
    <Card>
      <Button fullWidth color= {new Date().getDay()+1 == Number(day.title.slice(-1))?"success":"info"} variant="contained">
        {heading} {day.title}
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
                  {showInput !== task.text && task.text}
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
                <Checkbox
                  checked={task.status}
                  onClick={() => {
                    const tasks = day.tasks.filter(
                      (item) => item.text !== task.text
                    );
                    updateTask(`manage${slug}`, day.title, {
                      ...day,
                      tasks: [
                        ...tasks,
                        { text: task.text, status: !task.status },
                      ],
                    });
                  }}
                />
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
        <Button onClick={() => {
           updateTask(`manage${slug}`, day.title, {
            ...day,
            tasks: [],
          });
        }}>reset</Button>
      </CardActionArea>
    </Card>
  );
}

export default DayCard;
