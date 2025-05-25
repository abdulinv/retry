import React from 'react';
import { LinearProgress, ListItemText } from '@mui/material';
import Text from './Text';
import Input from './Input';
import { RoadMaps, Topic } from './types';
import { useLoading } from '../hook/useLoading';

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
  const {loading,load,unload} = useLoading();
  const handleBlur = ()=>{
    load();
    onBlur();
    unload();
  }
  return (
    <ListItemText onDoubleClick={handleEnableEdit.bind(null, topic, 'title')}>
      {loading && <LinearProgress sx={{ml:2}} />}
      {!loading && <Text text={topic.title} visible={showInput !== topic.title} />}
      
      <Input
        value={value}
        onChange={(val) => onChange(val)}
        onBlur={handleBlur}
        visible={showInput === topic.title}
      />
    </ListItemText>
  );
}

export default TitleControl;
