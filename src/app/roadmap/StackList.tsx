"use client";

import {
  Button,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { RoadMapDoc } from "./types";
import { useState } from "react";
import { addDocument } from "../../../lib/fetch";

interface RoadMapProps {
  RoadMaps: RoadMapDoc[];
  setSelectedStack: (stack: string) => void;
}

function StackList({ RoadMaps, setSelectedStack }: RoadMapProps) {
  const [showInput, setShowInput] = useState("");
  const [value, setValue] = useState("");
  console.log("road maps data",RoadMaps);
  const stacklist = [...new Set(RoadMaps.map((item) => item.doc.stack))];
  return (
    <Grid2 sx={{ border: "1px solid grey", borderRadius: "12px" }} size={2}>
      <Button onClick={() => setShowInput("add new")}>
        {showInput !== "add new" && (
          <Typography variant="body2">add new</Typography>
        )}
        {showInput === "add new" && (
          <TextField
            value={value}
            autoFocus
            size="small"
            fullWidth
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              const newDoc = {
                title: "Enter title here",
                topics: ["add here"],
                stack: value,
              };
              addDocument(`rm-${value}`, newDoc);
              setShowInput("");
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the default border
                },
                "&:hover fieldset": {
                  border: "none", // Prevent border on hover
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Prevent border on focus
                },
              },
            }}
          />
        )}
      </Button>
      <List>
        {stacklist.map((item: string) => (
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