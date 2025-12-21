import React from 'react';
import { RoadMaps, Topic } from './types';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { StyledTextInput } from './Styles';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { revisionDateCalc } from './DateControl';

interface CardHeadingProps {
  showInput: string | null;
  item: RoadMaps;
  handleTitleEdit: (topic: Topic | RoadMaps, property: string) => void;
  handleTitleChange: () => void;
  value: string;
  onChange: (arg: string) => void;
  expand: boolean;
  setExpand: () => void;
}

function CardHeading({
  showInput,
  item,
  handleTitleEdit,
  handleTitleChange,
  onChange,
  value,
  setExpand,
  expand,
}: CardHeadingProps) {
  const RevisionPendingTopics = (topics: Topic[]) => {
    // 1. Initialize the result object to hold categorized topics
    const pending: {
      [index: string]: string[];
      criticalDay1Review: string[]; // Topics learned yesterday (diffDays === 1)
      firstWeekCheck: string[]; 
      thirdWeekCheck:string[];// Topics due within the first week (diffDays 2-7)
      longTermMaintenance: string[]; // Topics due 1-3 weeks out (diffDays 7-21)
      others: string[];
      end:string[]
    } = {
      criticalDay1Review: [], // Topics learned yesterday (diffDays === 1)
      firstWeekCheck: [], 
      thirdWeekCheck:[],// Topics due within the first week (diffDays 2-7)
      longTermMaintenance: [], // Topics due 1-3 weeks out (diffDays 7-21)
      others: [],
      end:[] // Topics that are not urgent or are learned today
    };

    // 2. Iterate through all topics
    if (!topics || topics.length === 0) {
      return pending;
    }

    topics.forEach((topic: Topic) => {
      // Assume 'topic.lastReviewed' holds the last learning date.
      // We use the previously defined logic to get the current status.
      const status = revisionDateCalc(topic.date)?.status ?? 'p4';

      // 3. Categorize the topic based on the status string
      if (status.includes('p1') && !topic.revised?.['p1']) {
        pending.criticalDay1Review.push(topic.title);
      } else if (status.includes('p2') && !topic.revised?.['p2']) {
        pending.firstWeekCheck.push(topic.title);
      } else if (status.includes('p3') && !topic.revised?.['p2']) {
        pending.thirdWeekCheck.push(topic.title);
      } 
      else if (status.includes('p4') && !topic.revised?.['p2']) {
        pending.longTermMaintenance.push(topic.title);
      }else  if (status.includes('p5') && !topic.revised?.['p2']){
        pending.others.push(topic.title);
      }else  if (status.includes('p6') && !topic.revised?.['p2']){
        pending.end.push(topic.title);
      }
    });

    // 4. Return the categorized list
    return pending;
  };

  const pending = RevisionPendingTopics(item.topics);
  console.log('items', item.topics);
  return (
    <Stack flexDirection={'row'}>
      {showInput !== item.title && (
        <Button
          sx={{
            borderRadius: '0px',
          }}
          fullWidth
          color={item.color}
          variant="contained"
          onDoubleClick={() => handleTitleEdit(item, 'title')}
        >
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            width={'100%'}
          >
            <Typography
              align="center"
              variant="subtitle1"
              fontWeight={900}
              fontSize={14}
            >
              {item.title}
            </Typography>
            <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
              {pending.criticalDay1Review.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'red',
                  }}
                >
                  🚨 {pending.criticalDay1Review.length}
                  {'  '}
                </Typography>
              )}

              {pending.firstWeekCheck.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'blue',
                  }}
                >
                  🔥 {pending.firstWeekCheck.length}
                  {'  '}
                </Typography>
              )}

               {pending.thirdWeekCheck.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'blue',
                  }}
                >
                   ⏰ {pending.thirdWeekCheck.length}
                  {'  '}
                </Typography>
              )}

              {pending.longTermMaintenance.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'blue',
                  }}
                >
                  🟠 {pending.longTermMaintenance.length}
                  {'  '}
                </Typography>
              )}

              {pending.others.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'blue',
                  }}
                >
                  🔵 {pending.others.length}
                  {'  '}
                </Typography>
              )}

               {pending.end.length !== 0 && (
                <Typography
                  sx={{
                    border: '1px solid white',
                    borderRadius: 12,
                    p: 0.5,
                    background: '#ffff',
                    color: 'blue',
                  }}
                >
                  🔄 {pending.end.length}
                  {'  '}
                </Typography>
              )}


              <Typography> {item.topics.length}</Typography>
            </Stack>
          </Stack>
        </Button>
      )}
      {showInput === item.title && (
        <StyledTextInput
          value={value}
          autoFocus
          size="small"
          fullWidth
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleTitleChange}
        />
      )}
      <Box sx={{ backgroundColor: '#ddd', color: 'white' }} bgcolor={'primary'}>
        <IconButton
          onClick={() => {
            setExpand();
          }}
          color="inherit"
        >
          {!expand ? (
            <ArrowDownward color="primary" />
          ) : (
            <ArrowUpward color="success" />
          )}
        </IconButton>
      </Box>
    </Stack>
  );
}

export default CardHeading;
