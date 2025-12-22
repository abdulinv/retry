import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  Box,
  Dialog,
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

  
  if (actualTimeDiff < 0) {
    return { title: 'Not Yet Due', icon: '', status: 'p0' };
  }

  // P1: CRITICAL IMMEDIATE REVISION (within the first 24 hours)
  // This logic MUST use actualTimeDiff
  const TWO_HOURS = 1000 * 60 * 60 * 2;
  const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 32;

  // 4-12 hours review window (ideal time)
  if (actualTimeDiff >= TWO_HOURS && actualTimeDiff < TWENTY_FOUR_HOURS) {
    return {
      title: `🚨 Urgent: Day 1 Review Due (${((TWENTY_FOUR_HOURS - actualTimeDiff) / (1000 * 60 * 60)).toFixed(2)} hours remaining)`,
      icon: '🚨',
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
  if (diffDays >= 2 && diffDays <= 14 &&   (14 - diffDays)<=3) {
    return {
      title: `🔥 Due: First week revision required (${
        7 - diffDays
      } days remaining)`,
      icon: '🔥',
      status: 'p2',
    };
  }

  // Interval 3: Long-Term Check (1-3 weeks)
  if (diffDays > 14 && diffDays <= 28 && (28 - diffDays) <=7 ) {
    return {
      title: `⏰ Due: Third week Revision Required (${
        21 - diffDays
      } days  remaining)`,
      icon: '⏰ ', // Using yellow for the fading alert
      status: 'p3',
    };
  }

  // Interval 4: Maintenance (3-6 weeks)
  // if (diffDays > 21 && diffDays <= 45 && (45 - diffDays)<=7) {
  //   return {
  //     title: `🟠 1 month Review Required (${45 - diffDays} days  remaining)`,
  //     icon: '🟠',
  //     status: 'p4',
  //   };
  // }

  // Interval 5: Deep Maintenance (1.5-3 months)
  // if (diffDays > 45 && diffDays < 90 && (90 - diffDays) <=10) {
  //   return {
  //     title: `🔵 2 months Revision Required (${90 - diffDays} days  remaining)`,
  //     icon: '🔵',
  //     status: 'p5',
  //   };
  // }

  // Interval 6: Long-Term Archive (3+ months)
  // if (diffDays >= 90 && diffDays < 180) {
  //   return {
  //     title: `🔄 Last Maintenance Review Required (${
  //       180 - diffDays
  //     } days  remaining)`,
  //     icon: '🔄',
  //     status: 'p6',
  //   };
  // }

  // Final Catch-all (should be rare)
  return {
    title: 'Not Applicable',
    icon: '',
    status: 'p0',
  };
};
function DateControl({ item, topic, id }: DateControlProps) {
  const { loading, load, unload } = useLoading();
  const [show, setShow] = useState(false);
  const handleDateChange = async () => {
    const index = findIndex(item, topic);
    const action = CONSTANTS.ADD_DATE_ACTION;
    action.value = new Date().toISOString();
     setShow(true);
    load();
    await UpdateRoadMap(item, id, index, action);
    unload();
  };
  const revInfo = revisionDateCalc(topic.date);
  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
      <Dialog
        open={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <Stack p={3} gap={2}>
          <Typography color='error' fontWeight={600} fontSize={18}>Critical Action Required - Consolidation</Typography>
           <Typography color='error' fontWeight={400} fontSize={15}>
            Recall  the topics from start to end qucikly to consolidate and reinforce  </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} my={1}>
          <Button sx={{
            textTransform:'none'
          }} color='success' variant='contained' onClick={()=>{
           setShow(false);
          }}>Ok i will do that next</Button>
        </Stack>
      </Dialog>
      {!topic.revised?.[revInfo.status] && (
        <Tooltip title={revInfo.title}>
          <Box
            component={'div'}
            onClick={async () => {
              console.log('revi', topic.revised);
              const index = findIndex(item, topic);
              let action = CONSTANTS.REIVSION_P1_ACTION;
              if (revInfo.status === 'p1') {
                action = CONSTANTS.REIVSION_P1_ACTION;
              } else if (revInfo.status === 'p2') {
                action = CONSTANTS.REVISION_P2_ACTION;
              } else if (revInfo.status === 'p3') {
                action = CONSTANTS.REVISION_P3_ACTION;
              } else if (revInfo.status === 'p4') {
                action = CONSTANTS.REVISION_P4_ACTION;
              } else if (revInfo.status === 'p4') {
                action = CONSTANTS.REVISION_P5_ACTION;
              } else if (revInfo.status === 'p6') {
                action = CONSTANTS.REVISION_P6_ACTION;
              }
              load();
              await UpdateRoadMap(item, id, index, action);
              unload();
            }}
          >
            <Typography fontSize={20} fontWeight={800}>
              {loading && <CircularProgress size={'16px'} />}
              {!loading && revInfo.icon}
            </Typography>
          </Box>
        </Tooltip>
      )}

      <Button
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
