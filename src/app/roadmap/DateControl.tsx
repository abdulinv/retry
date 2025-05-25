import React from 'react';
import { Button } from '@mui/material';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import { RoadMaps, Topic } from './types';
import CONSTANTS from './constants';

interface DateControlProps {
  topic:Topic,
  item:RoadMaps,
  id:string
}
function DateControl({ item ,topic,id}: DateControlProps) {
  const handleDateChange = () => {
    const index =  findIndex(item,topic);
    const action = CONSTANTS.ADD_DATE_ACTION;
    action.value = new Date().toISOString().split("T")[0];
    UpdateRoadMap(item,id,index,action)
  };
  return (
    <Button
      variant="text"
      sx={{
        mr: 6,
      }}
      onClick={handleDateChange}
    >
      {topic.date ? topic.date : 'Pending'}
    </Button>
  );
}

export default DateControl;
