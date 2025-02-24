"use client";
import {
  Stack,
  Box,
  Button
} from "@mui/material";
import React,{useState} from "react";

import { TimeDocs } from "./types";
import DayWise from "./DayWise";
import MonthWise from "./MonthWise";

function DataProvider({ data }: { data: TimeDocs[] }) {
 

  const [tab,setTab] = useState("daily");

  const handleChangeTab = (tabName:string)=>{
      setTab(tabName)
  }
  return (
    <Stack  gap={4}>
      <Stack flexDirection={"row"} justifyContent={"center"}>
        <Button onClick={()=>handleChangeTab("daily")}>Daily</Button>
        <Button onClick={()=>handleChangeTab("monthly")}>Monthly</Button>
      </Stack>
      <Box>
        {tab === 'daily' &&  <DayWise data={data}/> }
        {tab === 'monthly' && <MonthWise data={data}/>}
      </Box>
    </Stack>
  );
}

export default DataProvider;
