import React from 'react';
import { ListItemIcon } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { RoadMaps, Topic } from './types';

interface NoteControlProps {
  topic: Topic;
  handleEnableEdit: (topic: Topic | RoadMaps, property: string) => void;
}

function NoteControl({ topic, handleEnableEdit }: NoteControlProps) {
  return (
    <ListItemIcon onClick={handleEnableEdit.bind(null, topic, 'note')}>
      <InfoIcon
        sx={{ cursor: 'pointer' }}
        color={topic?.note?.length < 15 ? 'disabled' : 'info'}
      />
    </ListItemIcon>
  );
}

export default NoteControl;
