import React from 'react';
import { Button } from '@mui/material';
import { Task } from '@/models/checklist/daily/daily';
import { Day } from './DayCard';
import { updateTask } from '../../../lib/fetch';

interface StatusControlProps {
  task: Task;
  day: Day['day'];
  mode: string;
}

function StatusControl({ task, day, mode }: StatusControlProps) {
  return (
    <>
      {task.status === 'Planned' && (
        <Button
          variant="text"
          size="small"
          sx={{ backgroundColor: '#1A237E' }}
          color="info"
          onClick={() => {
            const tasks = day.tasks.filter((item) => item.text !== task.text);
            updateTask(`manage${mode}`, day.title, {
              ...day,
              tasks: [
                ...tasks,
                {
                  text: task.text,
                  status: 'Open',
                  duration: task.duration,
                  openedOn: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }),
                  subTasks: [],
                },
              ],
            });
          }}
        >
          Open task
        </Button>
      )}
      {mode === 'Monthly' && task.status !== 'Planned' && (
        <Button
          variant="text"
          size="small"
          title="Mark as Complete"
          sx={{
            m: 0,
            fontSize: 12,
          }}
          disabled={task.status === 'Open' && (task.duration?.hh || 0) < 100}
          color="primary"
          onClick={() => {
            if (task.status === 'Open' && (task.duration?.hh || 0) < 100)
              return;
            const tasks = day.tasks.filter((item) => item.text !== task.text);
            const updatedObject = {
              text: task.text,
              status: task.status === 'Open' ? 'Close' : 'Open',
              duration: task.duration,
              completedOn: '',
              openedOn: '',
              subTasks: task.subTasks,
            };
            if (task.status === 'Open') {
              updatedObject.completedOn = new Date().toLocaleDateString(
                'en-GB',
                {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }
              );
            }

            if (task.status === 'Close') {
              updatedObject.openedOn = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              });
            }

            updateTask(`manage${mode}`, day.title, {
              ...day,
              tasks: [...tasks, updatedObject],
            });
          }}
        >
          {task.status === 'Open' ? 'Complete' : 'Open'}
        </Button>
      )}
    </>
  );
}

export default StatusControl;
