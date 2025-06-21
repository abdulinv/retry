import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const stacks = [
  'DATA STRUCTURE AND ALGORITHM',
  'BACK END',
  'DATA STRUCTURE AND ALGORITHM',
  'FRONT END',
];

function Scheduler() {
  const today = new Date().getDate();

  let week = 0;
  if (today >= 9 && today <= 15) {
    week = 1;
  } else if (today >= 16 && today <= 24) {
    week = 2;
  } else if (today >= 25) {
    week = 3;
  }

  const startOfWeek = week * 7 + 1;
  const dayInWeek = today - startOfWeek + 1;

  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: '500px',
        p: 2,
        borderRadius: 2,
   
      }}
      flexDirection="row"
      gap={0}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight={700}>{stacks[week]}</Typography>
      <Stack flexDirection="row" gap={1}>
        {Array.from({ length:week<=1? 8:7 }, (_, i) => (
          <Box
            key={i}
            sx={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor: i < dayInWeek ? 'green' : '#ccc',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Scheduler;
