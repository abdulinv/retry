'use client';

import React,{useState} from 'react';
import { Grid2 } from '@mui/material';
import DayCard from '../DayCard';
import { Duration, Tasks } from '@/models/checklist/daily/daily';
import { updateTask } from '../../../../lib/fetch';

interface CardContainerProps {
  data: Tasks[];
}

function CardContainer({ data }: CardContainerProps) {

    const [draggedItem,setDraggedItem] =  useState("");
     const [taskStart, setTaskStart] = useState<null | string>(null);


  const allTasks = data
    .filter((item) => item.title === 'january2025')
    .toSorted((a, b) => a.order - b.order);

  console.log("all",allTasks)

  function updateWeeklyDuration(duration: Duration, text: string) {
    const monthlyTasks = data.filter((item) => item.category === 'Monthly');

    const monthTitleTobeUpdated = monthlyTasks.find((month) =>
      month.tasks.find((item) => item.text === text)
    )?.title;
    const monthTobeUpdated = monthlyTasks.find(
      (week) => week.title === monthTitleTobeUpdated
    ) as Tasks;
    const index = monthTobeUpdated.tasks.findIndex(
      (item) => item.text === text
    );
    const taskTobeUpdated = monthTobeUpdated.tasks[index];
    console.log("t2",taskTobeUpdated )

    const total =
      ((taskTobeUpdated.duration?.hh || 0) + duration.hh) * 60 +
      ((taskTobeUpdated.duration?.mm || 0) + duration.mm);
    const currentHH = Math.floor(total / 60);
    const currentMM = total % 60;
    console.log(
      currentHH,
      currentMM,
      total,
      duration.mm,
      taskTobeUpdated.duration?.mm
    );

    updateTask('manageMonthly', monthTitleTobeUpdated as string, {
      ...monthTobeUpdated,
      tasks: [
        ...monthTobeUpdated.tasks.slice(0, index),
        {
          text: taskTobeUpdated.text,
          status: taskTobeUpdated.status,
          duration: {
            hh: currentHH,
            mm: currentMM,
          },
          updatedOn: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
          tag:taskTobeUpdated.tag,
          subTasks:taskTobeUpdated?.subTasks

        },
        ...monthTobeUpdated.tasks.slice(index + 1),
      ],
    });
  }

  function autoUpdateDaily(value: string) {
    const dailyTasks = data.filter((item) => item.category === 'Daily');
    const weeklyTasks = data.filter((item) => item.category === 'Weekly');

    dailyTasks.forEach((item) => {
      const index = item.tasks.findIndex((el) => el.text === value.slice(8));
      if (index === -1) {
        updateTask('manageDaily', item.title, {
          ...item,
          tasks: [...item.tasks, { text: value.slice(8), status: "Open" ,subTasks:[]}],
        });
      }
    });

    weeklyTasks.forEach((item) => {
      const index = item.tasks.findIndex((el) => el.text === value.slice(8));
      if (index === -1) {
        updateTask('manageWeekly', item.title, {
          ...item,
          tasks: [...item.tasks, { text: value.slice(8), status: "Open" ,subTasks:[]}],
        });
      }
    });
  }
  return (
    <>
      <Grid2
        width={'100%'}
        container
        justifyContent={'center'}
        gap={4}
        mt={2}
      >
        <Grid2 size={11}>
          {allTasks.map((day: Tasks, i: number) => {
            return (
              <DayCard
                key={i}
                mode='Monthly'
                day={day}
                autoUpdateDaily={autoUpdateDaily}
                updateWeeklyDuration={updateWeeklyDuration}
                dragItem={draggedItem}
                setDragItem={setDraggedItem}
                taskStart={taskStart}
                setTaskStart={setTaskStart}
              />
            );
          })}
        </Grid2>
      </Grid2>
    </>
  );
}

export default CardContainer;
