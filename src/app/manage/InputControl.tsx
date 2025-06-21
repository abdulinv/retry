import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { updateTask } from '../../../lib/fetch';
import { Day } from './DayCard';
import { Task } from '@/models/checklist/daily/daily';

interface InputControlProps {
  mode: string;
  setShowInput: (arg: null) => void;
  day: Day['day'];
  task: Task;
  showInput:string | null;
}

function InputControl({ mode, day, task, setShowInput,showInput }: InputControlProps) {
  const [value, setValue] = useState('');

  useEffect(()=>{
    setValue(task.text)
  },[task?.text])

  const handleSave = () => {
    const tasks = day.tasks.filter((item) => item.text !== task.text);
    updateTask(`manage${mode}`, day.title, {
      ...day,
      tasks: [
        ...tasks,
        {
          text: value,
          status: task.status,
          subTasks: task.subTasks,
        },
      ],
    });
    setShowInput(null);
  };
  

  if(showInput !== task.text) return null;
  
  return (
    <TextField
      value={value}
      autoFocus
      size="small"
      fullWidth
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove the default border
          },
          '&:hover fieldset': {
            border: 'none', // Prevent border on hover
          },
          '&.Mui-focused fieldset': {
            border: 'none', // Prevent border on focus
          },
        },
      }}
    />
  );
}

export default InputControl;
