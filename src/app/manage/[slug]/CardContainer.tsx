"use client";

import React from "react";
import { Grid2 } from "@mui/material";
import DayCard from "../DayCard";
import { useParams } from "next/navigation";
import { Tasks } from "@/models/checklist/daily/daily";
import { updateTask } from "../../../../lib/fetch";

interface CardContainerProps {
  data: Tasks[];
}

function CardContainer({ data }: CardContainerProps) {
  const params = useParams();
  const slug = params.slug as string;
  const tasks = data
    .filter((item) => item.category === slug)
    .toSorted((a, b) => a.order - b.order);

  function autoUpdateDaily(value:string) {
    const dailyTasks = data.filter((item) => item.category === "Daily");
    dailyTasks.forEach((item) => {
      updateTask("manageDaily", item.title, {
        ...item,
        tasks: [...item.tasks, { text: value.slice(8), status: false }],
      });
    });
  }
  let size;
  if (slug === "Daily") {
    size = 4;
  } else if (slug === "Weekly") size = 6;
  else size = 10;
  return (
    <>
      <Grid2 container gap={2} rowGap={6} justifyContent={"space-evenly"}>
        {tasks.map((day: Tasks, i: number) => {
          return (
            <Grid2 key={i} size={size}>
              <DayCard day={day} autoUpdateDaily={autoUpdateDaily} />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default CardContainer;
