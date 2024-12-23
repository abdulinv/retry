"use client";
import {  List, ListItem, ListItemText, Stack ,Box} from "@mui/material";
import React from "react";

import { TimeDocs } from "./types";

function DataProvider({data}:{data:TimeDocs[]}) {
  return (
    <Stack flexDirection={"row"} gap={4}>
     
      <Box>
        <List>
            {data[0].doc.data.map((item)=>{
                return (
                    <ListItem key={item.date}>
                        <ListItemText>{item.date}</ListItemText>
                        <ListItemText>{item.time?.hours}</ListItemText>
                    </ListItem>
                )
            })}
        </List>
      </Box>
    </Stack>
  );
}

export default DataProvider;
