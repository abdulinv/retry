import React from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Typography,
  } from "@mui/material";
import { TimeDocs } from './types';

interface DayWiseProps{
    data:TimeDocs[]
}
const getColor = (value: number) => {
    if (value > 15) return "success";
    if (value > 7) return "info";
    if (value > 3) return "warning";
    return "error";
  };


function DayWise({data}:DayWiseProps) {
  return (
    <List>
          {data
            .toSorted((a,b) => {
              if (new Date(a.doc.date) > new Date(b.doc.date)) {
                return 1;
              } else return -1;
            })
            .map((item) => {
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
                      variant="h6"
                    >
                      {item.doc.date}
                    </Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography
                      color={getColor(Number(item.doc.time?.hours))}
                      variant="h6"
                    >
                      {item.doc.time?.hours} Hours {item.doc.time?.minuits}{" "}
                      Minuits only{" "}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
        </List>
  )
}

export default DayWise