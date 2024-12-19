"use client";

import React, { useState } from "react";
import { RevDocs } from "./types";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { addDocument, updateTask } from "../../../lib/fetch";

function DataProvider({ data }: { data: RevDocs[] }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  
  const sortedData = data.toSorted((a,b)=>a.doc.priority-b.doc.priority)
  return (
    <>
      <Button
        
        onClick={() => {
          addDocument("revision", {
            name: "add here",
            priority: 0,
            count: 0,
          });
        }}
        sx={{ marginTop: 10 }}
      >
        +
      </Button>
      <List
        sx={{
          marginTop: 1,
          marginRight: 10,
          marginLeft: 20,
          p: 2,
          border: "1px solid grey",
          borderRadius: "16px",
        }}
      >
        <ListItem>
          <ListItemText
            sx={{
              minWidth: "25vw",
              maxWidth: "25vw",
            }}
          >
            <Typography variant="h5">STACK</Typography>
          </ListItemText>
          <ListItemButton
            sx={{
              minWidth: "10vw",
              maxWidth: "10vw",
            }}
          >
            <Typography variant="h5">PRIORITY</Typography>
          </ListItemButton>
          <ListItemButton
            sx={{
              minWidth: "5vw",
              maxWidth: "5vw",
            }}
          >
            <Typography variant="h5">COUNT</Typography>
          </ListItemButton>
        </ListItem>
        {sortedData.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemText
                sx={{
                  minWidth: "25vw",
                  maxWidth: "25vw",
                }}
                onDoubleClick={() => {
                  setShowInput(item.doc.name);
                  setValue(item.doc.name);
                }}
              >
                {showInput !== item.doc.name && (
                  <Typography variant="body1" fontWeight={500} fontSize={20}>
                    {" "}
                    {item.doc.name.toUpperCase()}
                  </Typography>
                )}
                {showInput === item.doc.name && (
                  <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    onBlur={() => {
                      updateTask("revision", item.id, {
                        ...item.doc,
                        name: value,
                      });
                      setShowInput(null);
                    }}
                  />
                )}
              </ListItemText>
              <Button
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  minWidth: "5vw",
                  maxWidth: "5vw",
                  textAlign: "left",
                  p: 1,
                  marginLeft: 4,
                  borderRadius: "12px",
                }}
                onDoubleClick={() => {
                  setShowInput(`${item.doc.name}-p`);
                  setValue(item.doc.priority.toString());
                }}
              >
                {showInput !== `${item.doc.name}-p` && (
                  <Typography variant="body1" fontWeight={500} fontSize={20}>
                    {item.doc.priority}
                  </Typography>
                )}
                {showInput === `${item.doc.name}-p` && (
                  <TextField
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onBlur={() => {
                      updateTask("revision", item.id, {
                        ...item.doc,
                        priority: Number(value),
                      });
                      setShowInput(null);
                    }}
                  />
                )}
              </Button>
              <Button
                color="success"
                variant="contained"
                size="small"
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  minWidth: "3vw",
                  maxWidth: "3vw",
                  textAlign: "left",
                  p: 1,
                  marginLeft: 12,
                  borderRadius: "100%",
                }}
                onClick={() => {
                  updateTask("revision", item.id, {
                    ...item.doc,
                    count: item.doc.count + 1,
                  });
                }}
              >
                {item.doc.count}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
export default DataProvider;
