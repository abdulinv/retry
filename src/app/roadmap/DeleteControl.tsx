import { CircularProgress, ListItemIcon } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTopic, findIndex } from '@/models/RoadMap/RoadMap';
import { RoadMaps, Topic } from './types';
import { useLoading } from '../hook/useLoading';

interface DeleteControlProps {
  item: RoadMaps;
  topic: Topic;
  id: string;
}

function DeleteControl({ item, topic, id }: DeleteControlProps) {
  const { loading, load, unload } = useLoading();
  const handleDeleteClick = async () => {
    const index = findIndex(item, topic);
    load();
    await deleteTopic(item, id, index);
    unload();
  };
  return (
    <ListItemIcon
      sx={{
        cursor: 'pointer',
      }}
      onClick={handleDeleteClick}
    >
      {loading && <CircularProgress size={'24px'} color="error" />}
      {!loading && <DeleteIcon color="error" />}
    </ListItemIcon>
  );
}

export default DeleteControl;
