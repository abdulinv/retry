import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '@/models/checklist/daily/daily';

interface DurationControlProps {
  task: Task;
}

function DurationControl({ task }: DurationControlProps) {
  return (
    <Box sx={{color:"GrayText"}}>
     
        <Typography color="inherit" fontWeight={600} px={0.5}>
          {task.duration
            ? `${task.duration.hh} hours ${task.duration.mm} minuits`
            : '00 hours 00 minuits'}
        </Typography>
      
    </Box>
  );
}

export default DurationControl;
