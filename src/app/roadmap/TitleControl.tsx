import React from 'react';
import { ListItemText } from '@mui/material';
import Text from './Text';
import Input from './Input';
import { RoadMaps, Topic } from './types';

interface TitleControlProps {
  topic: Topic;
  handleEnableEdit: (topic: Topic | RoadMaps, property: string) => void;
  showInput: string | null;
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
}

function TitleControl({
  topic,
  handleEnableEdit,
  showInput,
  value,
  onChange,
  onBlur,
}: TitleControlProps) {
  return (
    <ListItemText onDoubleClick={handleEnableEdit.bind(null, topic, 'title')}>
      <Text text={topic.title} visible={showInput !== topic.title} />
      <Input
        value={value}
        onChange={(val) => onChange(val)}
        onBlur={onBlur}
        visible={showInput === topic.title}
      />
    </ListItemText>
  );
}

export default TitleControl;
