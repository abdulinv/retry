"use client";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

import { TimeDocs } from "./types";

function DataProvider({ data }: { data: TimeDocs[] }) {


  const getColor = (value:number)=>{
    if(value >15) return "success"
    if(value>7)return "info"
    if(value>3) return "warning"
    return "error"
  }
  return (
    <Stack flexDirection={"row"} gap={4}>
      <Box>
        <List>
          {data.map((item) => {
            return (
              <ListItem
                divider
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50vw",
                }}
                key={item.doc.date}
              >
                <ListItemText
                  sx={{
                    width: "20vw",
                  }}
                >
                  <Typography 
                   color={getColor(Number(item.doc.time?.hours))}
                  variant="h6">{item.doc.date}</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography
                  color={getColor(Number(item.doc.time?.hours))}
                  variant="h6">{item.doc.time?.hours} Hours {item.doc.time?.minuits} Minuits only </Typography>
                   
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Stack>
  );
}

export default DataProvider;
