import React from 'react';
import { CardActionArea, Button, Box } from '@mui/material';
import { Colors, RoadMaps } from './types';
import { UpdateRoadMap, UpdateRoadMapCard } from '@/models/RoadMap/RoadMap';

interface CardControlProps {
  item: RoadMaps;
  id: string;
}

const colors: Colors[] = ['primary', 'warning', 'success', 'error'];
function CardControl({ item, id }: CardControlProps) {
  const handleAddTopic = () => {
    const action = {
      prop: 'add',
      value: '',
    };
    UpdateRoadMap(item, id, null, action);
  };

  const handleStatusChange = (prop: string, index: number) => {
    const action = {
      prop: prop,
      value: `${colors[index]}` as Colors,
    };
    UpdateRoadMapCard(item, id, action);
  };

  return (
    <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button fullWidth color="success" variant="text" onClick={handleAddTopic}>
        +
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          color="success"
          sx={{ fontSize: '8px' }}
          onClick={handleStatusChange.bind(null, 'done', 2)}
        >
          Done
        </Button>
        <Button
          color="warning"
          sx={{ fontSize: '8px' }}
          onClick={handleStatusChange.bind(null, 'prog', 1)}
        >
          prog
        </Button>
        <Button
          color="error"
          sx={{ fontSize: '8px' }}
          onClick={handleStatusChange.bind(null, 'pend', 3)}
        >
          pend
        </Button>
        <Button
          color="primary"
          sx={{ fontSize: '8px' }}
          onClick={handleStatusChange.bind(null, 'reset', 0)}
        >
          reset
        </Button>
      </Box>
    </CardActionArea>
  );
}

export default CardControl;