import React from 'react'
import { TimeDocs } from './types'
import { Stack, Typography } from '@mui/material';

interface MonthRow{
    data:TimeDocs[],
    month:string
}

const getColor = (value: number) => {
    if (value > 220) return "green";
    if (value > 180) return "#99FF99";
    if (value > 120) return "#FFFF99";
    if (value > 60) return "#FFB266";
    return "#FF6666";
  };

function MonthRow({data,month}:MonthRow) {

  const dataForMonth =  data.filter(item=>item.doc.date.includes(month));
  const totalHours =  dataForMonth.reduce((acc,item)=>acc+item.doc.time.hours,0); 
  const totalMins = dataForMonth.reduce((acc,item)=>acc+item.doc.time.minuits,0);

  const time =  Math.round(((totalHours * 60) + totalMins)/60);
  return (
    <Stack  flexDirection={"row"} justifyContent={"space-evenly"} 
    sx={{ backgroundColor:getColor(time), border:"1px solid grey",m:1,p:1, borderRadius:2,width:"400px"}}>
        <Typography variant='h5'>{month}</Typography>
        <Typography variant='h5'>{time} hours</Typography>
    </Stack>
  )
}

export default MonthRow