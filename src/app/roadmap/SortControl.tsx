import React from 'react';
import { ListItemIcon } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { RoadMaps, Topic } from './types';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import CONSTANTS from './constants';

interface SortControlProps {
  topic: Topic;
  item: RoadMaps;
  id: string;
}

function SortControl({ topic, item, id }: SortControlProps) {
  const handleSort = (topic: Topic, order: number) => {
    const index = findIndex(item, topic);
    const { SORT_ASC_ACTION, SORT_DSC_ACTION } = CONSTANTS;
    const action = order === 1 ? SORT_ASC_ACTION : SORT_DSC_ACTION;
    UpdateRoadMap(item, id, index, action);
  };

  return (
    <ListItemIcon
      onDoubleClick={() => handleSort(topic, -1)}
      onClick={() => handleSort(topic, 1)}
    >
      <SwapVertIcon
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
        color="primary"
      />
    </ListItemIcon>
  );
}

export default SortControl;
