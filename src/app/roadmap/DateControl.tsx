import React from 'react';
import {
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import { RoadMaps, Topic } from './types';
import CONSTANTS from './constants';
import { useLoading } from '../hook/useLoading';

interface DateControlProps {
  topic: Topic;
  item: RoadMaps;
  id: string;
}

/**
 * Calculates the revision status based on the time elapsed since the topic was learned.
 * @param {Date} topicDate The date the topic was last learned/mastered.
 * @returns {string} A status indicating the revision priority.
 */
export const revisionDateCalc = (topicDate: string | null) => {
  // 1. Ensure the input is a Date object
  const lastLearned = new Date(topicDate ?? '');
  const today = new Date();

  // 2. Set both dates to midnight to compare only the day difference accurately
  lastLearned.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // 3. Calculate the difference in milliseconds
  const diffTime = today.getTime() - lastLearned.getTime();

  // 4. Convert milliseconds to days
  // 1 day = 1000ms * 60s * 60m * 24h
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 5. Apply Spaced Repetition Logic (using common intervals)

  if (diffTime >= 1000*60*60*6 && diffTime<1000 * 60 * 60 * 24) {
    return {
      title: 'Urgent Revision reuiqred',
      icon: '🚨',
      status: 'p1',
    };
  }

  // Interval 2: Short-Term Check
  if (diffDays >= 2 && diffDays <= 7) {
    return {
      title: 'Due: First week revision required (1 week old)',
      icon: '⚠️',
      status: 'p2',
    };
  }

  // Interval 3: Long-Term Check
  if (diffDays > 7 && diffDays <= 21) {
    return {
      title: 'Due: Long-Term Revision Required (1-3 weeks old)',
      icon: '🟡',
      status: 'p3',
    };
  }

  // Interval 4: Maintenance
  if (diffDays > 21 && diffDays <= 45) {
    return {
      title: 'Maintenance Revision Required (3+ weeks old)',
      icon: '🟠',
      status: 'p4',
    };
  }

  if (diffDays > 45 && diffDays < 90) {
    return {
      title: 'Maintenance Revision Required (1.5 months old)',
      icon: '🔵',
      status: 'p5',
    };

  
  }
    if (diffDays >= 90) {
      return {
        title: 'Maintenance Revision Required (3 months old)',
        icon: '🔄',
        status: 'p6',
      };
    }

  // Fallback for future dates or errors
  return {
    title: 'Not Applicable',
    icon: '',
    status: 'p6',
  };
};
function DateControl({ item, topic, id }: DateControlProps) {
  const { loading, load, unload } = useLoading();
  const handleDateChange = async () => {
    const index = findIndex(item, topic);
    const action = CONSTANTS.ADD_DATE_ACTION;
    action.value = new Date().toISOString().split('T')[0];
    load();
    await UpdateRoadMap(item, id, index, action);
    unload();
  };

  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
      <Tooltip title={revisionDateCalc(topic.date).title}>
        <Typography fontSize={20} fontWeight={800}>
          {revisionDateCalc(topic.date).icon}
        </Typography>
      </Tooltip>

      <Button
        disabled={topic.date !== null  && revisionDateCalc(topic.date).status !== 'p6'}
        variant="text"
        sx={{
          mr: 4,
        }}
        onClick={handleDateChange}
      >
        {loading && <CircularProgress size={'16px'} />}
        {!loading ? (topic.date ? topic.date : 'Pending') : null}
      </Button>
    </Stack>
  );
}

export default DateControl;
