import React  from 'react';
import { Button, CircularProgress } from '@mui/material';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import { RoadMaps, Topic } from './types';
import CONSTANTS from './constants';
import { useLoading } from '../hook/useLoading';

interface DateControlProps {
  topic:Topic,
  item:RoadMaps,
  id:string
}
function DateControl({ item ,topic,id}: DateControlProps) {
  const {loading,load,unload} = useLoading();
  const handleDateChange = async() => {
    const index =  findIndex(item,topic);
    const action = CONSTANTS.ADD_DATE_ACTION;
    action.value = new Date().toISOString().split("T")[0];
    load();
    await UpdateRoadMap(item,id,index,action);
    unload();
  };
  return (
    <Button
      variant="text"
      sx={{
        mr: 6,
      }}
      onClick={handleDateChange}
    > 
      {loading && <CircularProgress size={"16px"}/>}
      {!loading ?topic.date ? topic.date : 'Pending':null}
    </Button>
  );
}

export default DateControl;
