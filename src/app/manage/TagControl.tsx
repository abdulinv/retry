import React from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import { Task } from '@/models/checklist/daily/daily';
import { Day } from './DayCard';
import { updateTask } from '../../../lib/fetch';
import { StyledSelect } from './styles';

interface TagControlProps {
  day: Day['day'];
  task: Task;
  mode: string;
}

function TagControl({ day, task, mode }: TagControlProps) {
  const data = day;

  const handleUpdate = (e: SelectChangeEvent<unknown>) => {
    const tasks = data.tasks.filter((item) => item.text !== task.text);
    updateTask(`manage${mode}`, data.title, {
      ...data,
      tasks: [
        ...tasks,
        {
          text: task.text,
          status: task.status,
          duration: task.duration,
          openedOn: task?.openedOn ?? '',
          completedOn: task?.completedOn ?? '',
          updatedOn: task?.updatedOn ?? '',
          tag: e.target.value as string,
          subTasks:[]
        },
      ],
    });
  };

  return (
    <StyledSelect
      size="small"
      color="info"
      value={task.tag ?? 'Notag'}
      onChange={handleUpdate}
    >
      <MenuItem value="Notag">#NOTAG</MenuItem>
      <MenuItem value="dsa">#DSA</MenuItem>
      <MenuItem value="fe">#FRONTEND</MenuItem>
      <MenuItem value="be">#BACKEND</MenuItem>
    </StyledSelect>
  );
}

export default TagControl;
