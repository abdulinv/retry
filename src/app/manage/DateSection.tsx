import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Task } from '@/models/checklist/daily/daily';

interface DateSectionProps {
  task: Task;
}

function DateSection({ task }: DateSectionProps) {
  return (
    <Stack sx={{color:"GrayText"}} flexDirection={'row'} gap={4} px={0.5}>
      {task?.openedOn && (
        <Stack color={"inherit"} flexDirection={'row'} gap={1}>
          <Typography color="inherit" fontWeight={500} fontSize={14}>
            Opened On
          </Typography>
          <Typography color="inherit" fontWeight={500} fontSize={14}>
            {task.openedOn ?? 'no date'}
          </Typography>
        </Stack>
      )}

      {task?.completedOn && (
        <Stack color={"inherit"} flexDirection={'row'} gap={1}>
          <Typography color="inheit" fontWeight={500} fontSize={14}>
            Completed On
          </Typography>
          <Typography color="inherit" fontWeight={500} fontSize={14}>
            {task.completedOn ?? 'no date'}
          </Typography>
        </Stack>
      )}

      {task?.updatedOn && (
        <Stack color={"inherit"} flexDirection={'row'} gap={1}>
          <Typography color="inherit" fontWeight={500} fontSize={14}>
            Last Updated On
          </Typography>
          <Typography color="inherit" fontWeight={500} fontSize={14}>
            {task.updatedOn ?? 'no date'}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default DateSection;
