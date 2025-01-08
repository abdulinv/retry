"use client";

import React, { useState } from "react";
import { RevDocs } from "./types";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { addDocument, updateTask } from "../../../lib/fetch";

function getColor(
  prio: number,
  count: number,
  max: number,
  name:string
):
  | "inherit"
  | "error"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning" {

  if (name === "JAVASCRIPT" && Math.abs(prio - max) >= 2 ){
     return "error"
  }
  if (name === "REACT" && Math.abs(prio - max) >= 2 ){
    return "error"
  }
  if (count <= 3 && Math.abs(prio - max) > 1 ) {
    return "error";
  }
  if (count > 3 && count <= 6 && Math.abs(prio - max) >= 2) {
    return "error";
  }
  if (count > 6 && count <= 9 && Math.abs(prio - max) >= 3) {
    return "error";
  }
  if (count > 10 && count <= 12 && Math.abs(prio - max) >= 4) {
    return "warning";
  }

  if (Math.abs(prio - max) >= 6) {
    return "warning";
  }
  if (Math.abs(prio - max) > 11) {
    return "error";
  }
  return "success";
}

function DataProvider({ data }: { data: RevDocs[] }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const sortedData = data.toSorted((a, b) => a.doc.priority - b.doc.priority);
  const maxPrio = data.reduce(
    (max, item) => Math.max(item.doc.priority, max),
    0
  );
  console.log(maxPrio, "maximamu latest");
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
      <Paper
        elevation={10}
        sx={{
          m: 5,
          display: "flex",
          justifyContent: "center",
          width: "60vw",
          height:"72vh",
          maxHeight:"72vh",
          marginLeft: 35,
          p: 4,
          paddingBottom:"100px",
          overflowY:"auto"
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              sx={{
                minWidth: "25vw",
                maxWidth: "25vw",
              }}
            >
              <Typography align="center" variant="h5">
                STACK
              </Typography>
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
                minWidth: "10vw",
                maxWidth: "10vw",
                paddingLeft: 4,
              }}
            >
              <Typography align="center" variant="h5">
                COUNT
              </Typography>
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
                    <Typography
                      p={1}
                      letterSpacing={1.1}
                      align="center"
                      borderRadius={2}
                      bgcolor={"rgb(0,0,0,0.8)"}
                      borderColor={`${getColor(
                        item.doc.priority,
                        item.doc.count,
                        maxPrio,
                        item.doc.name.toUpperCase()
                      )}`}
                      border={`1px solid `}
                      color={`${getColor(
                        item.doc.priority,
                        item.doc.count,
                        maxPrio,
                        item.doc.name.toUpperCase()
                      )}`}
                      variant="body1"
                      fontWeight={500}
                      fontSize={18}
                    >
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
                  color={`${getColor(
                    item.doc.priority,
                    item.doc.count,
                    maxPrio,
                    item.doc.name.toUpperCase()
                  )}`}
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
                  color={`${getColor(
                    item.doc.priority,
                    item.doc.count,
                    maxPrio,
                    item.doc.name.toUpperCase()
                  )}`}
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
                  onDoubleClick={()=>{
                    updateTask("revision", item.id, {
                      ...item.doc,
                      count: item.doc.count - 1,
                    });
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
      </Paper>
    </>
  );
}
export default DataProvider;
