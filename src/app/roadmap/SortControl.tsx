import React from 'react';
import { ListItemIcon } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { RoadMaps, Topic } from './types';
import { updateTask } from '../../../lib/fetch';

interface SortControlProps {
  topic: Topic;
  item: RoadMaps;
  id: string;
}

function SortControl({ topic, item, id }: SortControlProps) {
  const handleAscending = (topic: Topic) => {
    const index = item.topics.findIndex((item) => item.title === topic.title);

    const itemTobeUpdated = item.topics[index];
    updateTask(`rm-${item.stack}`, id, {
      ...item,
      topics: [
        ...item.topics.slice(0, index),
        {
          title: itemTobeUpdated.title,
          note: itemTobeUpdated.note,
          order: (itemTobeUpdated?.order || 0) + 1,
          link: '',
        },
        ...item.topics.slice(index + 1),
      ],
    });
  };

  const handleDescending = (topic: Topic) => {
    const index = item.topics.findIndex((item) => item.title === topic.title);

    const itemTobeUpdated = item.topics[index];
    updateTask(`rm-${item.stack}`, id, {
      ...item,
      topics: [
        ...item.topics.slice(0, index),
        {
          title: itemTobeUpdated.title,
          note: itemTobeUpdated.note,
          order: (itemTobeUpdated?.order || 0) - 1,
          link: '',
        },
        ...item.topics.slice(index + 1),
      ],
    });
  };

  return (
    <ListItemIcon
      onDoubleClick={() => handleDescending(topic)}
      onClick={() => handleAscending(topic)}
    >
      <SwapVertIcon
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'secondary.main', // Change to secondary color on hover
          },
        }}
        color="primary"
      />
    </ListItemIcon>
  );
}

export default SortControl;
