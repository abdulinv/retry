import React from 'react';
import { CardActionArea, Button, Box } from '@mui/material';
import { updateTask } from '../../../lib/fetch';
import { Colors, RoadMaps } from './types';

interface CardControlProps {
  item: RoadMaps;
  id: string;
}

const colors: Colors[] = ['primary', 'warning', 'success', 'error'];
function CardControl({  item, id }: CardControlProps) {
  return (
    <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button
        fullWidth
        color="success"
        variant="text"
        onClick={() => {
          updateTask(`rm-${item.stack}`, id, {
            ...item,
            topics: [
              ...item.topics,
              {
                title: `add - ${new Date()
                  .getMilliseconds()
                  .toString()
                  .slice(-4)}`,
                note: 'add note here',
                order: 1,
                link: '',
              },
            ],
          });
        }}
      >
        +
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          color="success"
          sx={{ fontSize: '8px' }}
          onClick={() => {
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[2]}` as Colors,
            });
          }}
        >
          Done
        </Button>
        <Button
          color="warning"
          sx={{ fontSize: '8px' }}
          onClick={() => {
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[1]}`,
            });
          }}
        >
          prog
        </Button>
        <Button
          color="error"
          sx={{ fontSize: '8px' }}
          onClick={() => {
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[3]}`,
            });
          }}
        >
          pend
        </Button>
        <Button
          color="primary"
          sx={{ fontSize: '8px' }}
          onClick={() => {
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[0]}`,
            });
          }}
        >
          reset
        </Button>
      </Box>
    </CardActionArea>
  );
}

export default CardControl;
