'use client';
import { Stack, Box } from '@mui/material';
import React from 'react';

import { TimeDocs } from './types';
import DayWise from './DayWise';

function DataProvider({ data }: { data: TimeDocs[] }) {
  return (
    <Stack gap={4}>
      <Box>
        <DayWise data={data} />
      </Box>
    </Stack>
  );
}

export default DataProvider;
