"use client";

import React from "react";
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
} from "@mui/material";

interface Day {
  day: {
    id: number;
    title: string;
    tasks: {
      text: string;
      status: string;
    }[];
  };
}

import { useParams } from "next/navigation";
function DayCard({ day }: Day) {
  const { slug } = useParams();
  console.log("from car", slug);
  
  let heading:string;
  let cat:string
  if (slug === "Daily") {
    heading = "Today is";
    cat = "day"
  }
  else if (slug === "Weekly"){
    heading = "The Week is";
    cat = "week"
  } 
  else {
    heading = "The Month is";
    cat = "month"
    }

  return (
    <Card>
      <CardContent
        sx={{ maxHeight: "300px", minHeight: "300px", overflow: "scroll" }}
      >
        <Typography>{heading} {day.title}</Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {day.tasks.map((task, i) => {
            return (
              <ListItem key={i}>
                <ListItemText>{task.text}</ListItemText>
                <Checkbox />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActionArea>
        <Button>+</Button>
        <Button>-</Button>
      </CardActionArea>
    </Card>
  );
}

export default DayCard;
