import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Task } from '@/models/checklist/daily/daily';

interface ProgressControlProps {
  task: Task;
  mode: string;
}

function ProgressControl({ task, mode }: ProgressControlProps) {
  return (
    <>
      {mode === 'Monthly' && (
        <Box sx={{ px: 0.5 }}>
          <LinearProgress
            sx={{
              height: 12,
              borderRadius: 4,
              border: '1px solid grey',
            }}
            color={
              (task.duration?.hh || 0) < 20
                ? 'error'
                : (task.duration?.hh || 0) < 30
                ? 'warning'
                : 'success'
            }
            variant="determinate"
            value={
              ((task.duration?.hh || 0) * 60 + (task.duration?.mm || 0)) / 60
            }
          />

          {(task.duration?.hh || 0) === 0 && (task.duration?.mm || 0) === 0 && (
            <Typography
              color="error"
              variant="body2"
              fontSize={14}
              mt={0.8}
              px={0.1}
            >
              You are not started this task yet !
            </Typography>
          )}
          {(task.duration?.hh || 0) > 10 && (task.duration?.hh || 0) < 20 && (
            <Typography
              color="inherit"
              variant="body2"
              fontSize={14}
              mt={0.8}
              px={0.1}
            >
              You are making progress...💪 keep going
            </Typography>
          )}
          {(task.duration?.hh || 0) > 75 && (task.duration?.hh || 0) < 95 && (
            <Typography
              color="info"
              variant="body2"
              fontSize={14}
              mt={0.8}
              px={0.1}
            >
              you made the minimum requirement...💪
            </Typography>
          )}
          {(task.duration?.hh || 0) > 95 && (task.duration?.hh || 0) < 99 && (
            <Typography
              color="grey"
              variant="body2"
              fontSize={14}
              mt={0.8}
              px={0.1}
            >
              congratulations...✨
            </Typography>
          )}
          {(task.duration?.hh || 0) > 99 && (task.duration?.hh || 0) < 49 && (
            <Typography
              color="grey"
              variant="body2"
              fontSize={14}
              mt={0.8}
              px={0.1}
            >
              Excellent...💥💥
            </Typography>
          )}
          {(task.duration?.hh || 0) > 100 && (
            <Typography
              color="grey"
              variant="body2"
              fontSize={14}
              fontWeight={500}
              mt={0.8}
              px={0.1}
            >
              Awesome...🔥🔥🔥 time to switch to another topic
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default ProgressControl;
