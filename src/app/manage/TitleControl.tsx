import { Task } from '@/models/checklist/daily/daily';
import { IconButton, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

interface TitleControlProps {
  task: Task;
  onEdit: () => void;
  showInput: string | null;
}

function TitleControl({ task, onEdit, showInput }: TitleControlProps) {
  if (showInput === task.text) return null;
  return (
    <Stack
      color={'GrayText'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={1.2}
      mb={0.8}
      borderRadius={1}
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
        color: 'white' }}
    >
      <Typography
        sx={{
          color: 'inherit',
        }}
        width={'60%'}
        borderRadius={'12px'}
        px={0.5}
        color="inherit"
        fontWeight={500}
        fontSize={16}
      >
        {task.text}
      </Typography>
      <IconButton color="inherit" onClick={onEdit}>
        <EditIcon color="inherit" fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default TitleControl;
