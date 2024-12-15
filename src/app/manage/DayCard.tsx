"use client";

import React, { useState } from "react";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  ListItemText,
  Checkbox,
  CardActionArea,
  Button,
  TextField,
} from "@mui/material";

interface Day {
  day: {
    id?: number;
    category?: string;
    title: string;
    tasks: {
      text: string;
      status: string;
    }[];
  };
}

import { useParams } from "next/navigation";
import { updateTask } from "../../../lib/fetch";

function DayCard({ day }: Day) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const { slug } = useParams();
  console.log("from car", slug);

  let heading: string;

  if (slug === "Daily") {
    heading = "Today is";
  } else if (slug === "Weekly") {
    heading = "The Week is";
  } else {
    heading = "The Month is";
  }

  return (
    <Card>
      <CardContent
        sx={{ maxHeight: "300px", minHeight: "300px", overflow: "scroll" }}
      >
        <Typography>
          {heading} {day.title}
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {day.tasks.map((task, i) => {
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
                          tasks: [...tasks, { text: value, status: "done" }],
                        });
                        setShowInput(null);
                      }}
                    />
                  )}
                </ListItemText>
                <Checkbox />
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
              tasks: [...day.tasks, { text: "add here", status: "not done" }] ,
            });
          }}
        >
          +
        </Button>
        <Button>-</Button>
      </CardActionArea>
    </Card>
  );
}

export default DayCard;
