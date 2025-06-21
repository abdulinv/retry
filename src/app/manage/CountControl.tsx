import React from 'react';
import { Stack, Badge, Button } from '@mui/material';
import { Day } from './DayCard';

interface CountControlProps {
  day: Day['day'];
  tab: string;
  handleTabChange: (arg: string) => void;
}

function CountControl({ day, tab, handleTabChange }: CountControlProps) {
  const openCount = day.tasks.filter((item) => item.status === 'Open').length;
  const closeCount = day.tasks.filter((item) => item.status === 'Close').length;
  const plannedCount = day.tasks.filter(
    (item) => item.status === 'Planned'
  ).length;

  return (
    <Stack flexDirection={'row'} m={0} p={0} gap={2}>
      <Badge
        badgeContent={openCount}
        color="primary"
        sx={{
          '& .MuiBadge-badge': {
            top: 15, // adjust as needed
            right: 10, // adjust as needed
            mb: 2,
          },
        }}
      >
        <Button
          sx={{
            color: tab === 'Open' ? 'white' : 'grey',
            mr: '12px',
          }}
          onClick={handleTabChange.bind(null, 'Open')}
          size="small"
          variant="text"
        >
          Open
        </Button>
      </Badge>

      <Badge
        badgeContent={closeCount}
        color="success"
        sx={{
          '& .MuiBadge-badge': {
            top: 15, // adjust as needed
            right: -5, // adjust as needed
            mb: 2,
          },
        }}
      >
        <Button
          sx={{
            color: tab === 'Close' ? 'white' : 'grey',
            mr: '4px',
          }}
          onClick={handleTabChange.bind(null, 'Close')}
          size="small"
          variant="text"
        >
          Closed
        </Button>
      </Badge>

      <Badge
        badgeContent={plannedCount}
        color="warning"
        sx={{
          '& .MuiBadge-badge': {
            top: 15, // adjust as needed
            right: -10, // adjust as needed
            mb: 2,
            mr: 1,
          },
        }}
      >
        <Button
          sx={{ color: tab === 'Planned' ? 'white' : 'grey' }}
          onClick={handleTabChange.bind(null, 'Planned')}
          size="small"
          variant="text"
        >
          Plan
        </Button>
      </Badge>
    </Stack>
  );
}

export default CountControl;
