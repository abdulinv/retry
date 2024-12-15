"use client";

import React from "react";
import { Grid2,Button } from "@mui/material";
import DayCard from "../DayCard";
import { useParams } from "next/navigation";
import { daily, monthly, Tasks, weekly } from "@/models/checklist/daily/daily";

interface CardContainerProps {
  data: Tasks[];
}
 const init = ()=>{
    localStorage.setItem("daily",JSON.stringify(daily));
    localStorage.setItem("weekly",JSON.stringify(weekly));
    localStorage.setItem("monthly",JSON.stringify(monthly));
 }

function CardContainer({ data }: CardContainerProps) {
  const params = useParams();
  const slug = params.slug as string;
  const tasks = data.filter(item=>item.category === slug);
  let size;
  if (slug === "Daily") {
    size = 4;
  }
  else if (slug === "Weekly") size = 5;
  else size = 6;
  return (
    <>
      <Button onClick={init} variant="contained">Init</Button>
      <Grid2 container gap={2} rowGap={6} justifyContent={"space-evenly"}>
        {tasks.map((day: Tasks, i: number) => {
          return (
            <Grid2 key={i} size={size}>
              <DayCard day={day} />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default CardContainer;
