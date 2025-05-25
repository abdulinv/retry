import React from 'react';
import { CircularProgress, ListItemIcon } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { RoadMaps, Topic } from './types';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import CONSTANTS from './constants';
import { useLoading } from '../hook/useLoading';

interface SortControlProps {
  topic: Topic;
  item: RoadMaps;
  id: string;
}

function SortControl({ topic, item, id }: SortControlProps) {
  const { loading, load, unload } = useLoading();
  const handleSort = async (topic: Topic, order: number) => {
    const index = findIndex(item, topic);
    const { SORT_ASC_ACTION, SORT_DSC_ACTION } = CONSTANTS;
    const action = order === 1 ? SORT_ASC_ACTION : SORT_DSC_ACTION;
    load();
    await UpdateRoadMap(item, id, index, action);
    unload();
  };

  return (
    <ListItemIcon
      onDoubleClick={() => handleSort(topic, -1)}
      onClick={() => handleSort(topic, 1)}
    >
      {loading && <CircularProgress size={"20px"} color='info' />}
      {!loading && (
        <SwapVertIcon
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
          color="primary"
        />
      )}
    </ListItemIcon>
  );
}

export default SortControl;
