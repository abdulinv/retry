"use client";

import React from "react";
import { Grid2 } from "@mui/material";
import DayCard from "../DayCard";
import { useParams } from "next/navigation";
import { Tasks } from "@/models/checklist/daily/daily";

interface CardContainerProps{
    data:Record<string,Tasks[]>
}

function CardContainer({data}:CardContainerProps) {
  const params = useParams();
  const slug = params.slug as string;
  let size;
  if (slug === "Daily") size = 3;
  else if (slug === "Weekly") size = 5;
  else size = 6;
  return (
    <Grid2 container gap={2} rowGap={6} justifyContent={"space-evenly"}>
      {data[slug]?.map((day: Tasks, i: number) => {
        return (
          <Grid2 key={i} size={size}>
            <DayCard day={day} />
          </Grid2>
        );
      })}
    </Grid2>
  );
}

export default CardContainer;