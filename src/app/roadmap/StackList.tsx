"use client"

import { Grid2, List, ListItem, ListItemButton } from "@mui/material";

import React from "react";
import { RoadMapDoc} from "./types";

interface RoadMapProps {
  RoadMaps: RoadMapDoc[];
  setSelectedStack:(stack:string)=>void
}

function StackList({ RoadMaps,setSelectedStack }: RoadMapProps) {
  const stacklist = [...new Set(RoadMaps.map(item=>item.doc.stack))] 
  return (
    <Grid2 sx={{ border: "1px solid grey", borderRadius: "12px" }} size={2}>
      <List>
        {stacklist.map((item:string) => (
          <ListItem key={item}>
            <ListItemButton onClick={() => setSelectedStack(item)}>
              {item}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid2>
  );
}

export default StackList;