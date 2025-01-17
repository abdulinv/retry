"use client";

import React from "react";
import { Grid2 } from "@mui/material";
import DayCard from "../DayCard";
import { useParams } from "next/navigation";
import { Duration, Tasks } from "@/models/checklist/daily/daily";
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


  function updateWeeklyDuration(duration:Duration,text:string){
    const monthlyTasks = data.filter((item) => item.category === "Monthly");
   
   const monthTitleTobeUpdated = monthlyTasks.find(month=>month.tasks.find(item=>item.text === text))?.title;
   const monthTobeUpdated = monthlyTasks.find(week=>week.title === monthTitleTobeUpdated) as Tasks;
   const index = monthTobeUpdated.tasks.findIndex(item=>item.text === text);
   const taskTobeUpdated = monthTobeUpdated.tasks[index];

   const total = (((taskTobeUpdated.duration?.hh || 0) + duration.hh) * 60)+ ((taskTobeUpdated.duration?.mm || 0) + duration.mm)
   const currentHH = Math.floor(total/60);
   const currentMM = total % 60;
   console.log(currentHH,currentMM,total,duration.mm,taskTobeUpdated.duration?.mm)

   updateTask('manageMonthly',monthTitleTobeUpdated as string,{
        ...monthTobeUpdated ,
        tasks:[
          ...monthTobeUpdated.tasks.slice(0,index),
          {text:taskTobeUpdated.text,status:taskTobeUpdated.status,duration:{
            hh:currentHH,
            mm:currentMM
          }},
          ...monthTobeUpdated.tasks.slice(index+1,),
        ]
   })

  }

  function autoUpdateDaily(value: string) {
    const dailyTasks = data.filter((item) => item.category === "Daily");
    const weeklyTasks = data.filter((item) => item.category === "Weekly");

    dailyTasks.forEach((item) => {
      const index = item.tasks.findIndex((el) => el.text === value.slice(8));
      if (index === -1) {
        updateTask("manageDaily", item.title, {
          ...item,
          tasks: [...item.tasks, { text: value.slice(8), status: false }],
        });
      }
    });

    weeklyTasks.forEach((item) => {
      const index = item.tasks.findIndex((el) => el.text === value.slice(8));
      if (index === -1) {
        updateTask("manageWeekly", item.title, {
          ...item,
          tasks: [...item.tasks, { text: value.slice(8), status: false }],
        });
      }
    });

    
  }
  let size;
  if (slug === "Daily") {
    size = 6;
  } else if (slug === "Weekly") size = 6;
  else size = 10;
  return (
    <>
      <Grid2 container gap={2} rowGap={1} justifyContent={"space-evenly"} flexGrow={"1"}>
        {tasks.map((day: Tasks, i: number) => {
          return (
            <Grid2 key={i} size={size}>
              <DayCard day={day} autoUpdateDaily={autoUpdateDaily}  updateWeeklyDuration={updateWeeklyDuration}/>
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default CardContainer;
