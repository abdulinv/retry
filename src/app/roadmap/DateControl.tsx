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
  const today = new Date();
  const lastLearned = new Date(topicDate ?? '');

  // 1. Calculate the TRUE elapsed time in milliseconds (BEFORE resetting hours)
  const actualTimeDiff = today.getTime() - lastLearned.getTime();

  // Handle errors/future dates immediately
  if (actualTimeDiff < 0) {
    return { title: 'Not Yet Due', icon: '', status: 'p0' };
  }

  // P1: CRITICAL IMMEDIATE REVISION (within the first 24 hours)
  // This logic MUST use actualTimeDiff
  const SIX_HOURS = 1000 * 60 * 60 * 6;
  const TWELVE_HOURS = 1000 * 60 * 60 * 12;
  const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

  // 4-12 hours review window (ideal time)
  if (actualTimeDiff >= SIX_HOURS && actualTimeDiff < TWELVE_HOURS) {
    return {
      title: '🚨 Urgent: Day 1 Review Due (4-12 hrs)',
      icon: '🚨',
      status: 'p1',
    };
  }

  // 12-24 hours review window (maximum effective time)
  if (actualTimeDiff >= TWELVE_HOURS && actualTimeDiff < TWENTY_FOUR_HOURS) {
    return {
      title: '🚨🚨 Max Deadline: Day 1 Review Due (12-24 hrs)',
      icon: '🚨🚨', // Using 2 alarms to show higher urgency/risk of fading
      status: 'p1',
    };
  }

  // --- Date-Based Checks (Only proceed if older than 24 hours) ---

  // 2. Set both dates to midnight to calculate the day difference accurately
  lastLearned.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffTimeMidnight = today.getTime() - lastLearned.getTime();

  // 3. Convert milliseconds to days (using the midnight difference)
  const diffDays = Math.floor(diffTimeMidnight / (1000 * 60 * 60 * 24));
  
  // NOTE: diffDays will now be 1 for the day AFTER learning. The next check should be diffDays >= 1 or diffDays >= 2.
  // Since we already handled the first 24 hours with actualTimeDiff, we start the day count from 2 here.

  // Interval 2: Short-Term Check (1 week)
  if (diffDays >= 2 && diffDays <= 7) {
    return {
      title: '⚠️ Due: First week revision required (1 week old)',
      icon: '⚠️',
      status: 'p2',
    };
  }
  
  // Interval 3: Long-Term Check (1-3 weeks)
  if (diffDays > 7 && diffDays <= 21) {
    return {
      title: '🟡 Due: Mid-Term Revision Required (1-3 weeks old)',
      icon: '🟡', // Using yellow for the fading alert
      status: 'p3',
    };
  }

  // Interval 4: Maintenance (3-6 weeks)
  if (diffDays > 21 && diffDays <= 45) {
    return {
      title: '🟠 Maintenance Review Required (3-6 weeks old)',
      icon: '🟠',
      status: 'p4',
    };
  }

  // Interval 5: Deep Maintenance (1.5-3 months)
  if (diffDays > 45 && diffDays < 90) {
    return {
      title: '🔵 Deep Maintenance Required (1.5-3 months old)',
      icon: '🔵',
      status: 'p5',
    };
  }

  // Interval 6: Long-Term Archive (3+ months)
  if (diffDays >= 90) {
    return {
      title: '🔄 Maintenance Review Required (3+ months old)',
      icon: '🔄',
      status: 'p6',
    };
  }

  // Final Catch-all (should be rare)
  return {
    title: 'Not Applicable',
    icon: '',
    status: 'p0',
  };
};
function DateControl({ item, topic, id }: DateControlProps) {
  const { loading, load, unload } = useLoading();
  const handleDateChange = async () => {
    const index = findIndex(item, topic);
    const action = CONSTANTS.ADD_DATE_ACTION;
    action.value = new Date().toISOString();
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
        disabled={topic.date !== undefined && revisionDateCalc(topic.date).status !== 'p6'}
        variant="text"
        sx={{
          mr: 4,
        }}
        onClick={handleDateChange}
      >
        {loading && <CircularProgress size={'16px'} />}
        {!loading ? (topic.date ? topic.date.split('T')[0] : 'Pending') : null}
      </Button>
    </Stack>
  );
}

export default DateControl;
