"use client";

import React, { useState } from "react";
import { BucketDocs, Skill } from "./types";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { updateTask } from "../../../lib/fetch";

function DataProvider({ data }: { data: BucketDocs[] }) {
  function UpdatePriority(item: Skill, option: string) {
    const { doc } = data[0];
    const index = doc.skills.findIndex((e) => e.name === item.name);
    const docTobeUpdated = doc.skills[index];
    const updatedPrio =
      option === "add"
        ? docTobeUpdated.priority + 1
        : docTobeUpdated.priority - 1;
    updateTask("bucketList", data[0].id, {
      skills: [
        ...doc.skills.slice(0, index),
        { name: docTobeUpdated.name, priority: updatedPrio },
        ...doc.skills.slice(index + 1),
      ],
    });
  }
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");

  const sortedList = data[0].doc.skills.toSorted(
    (a, b) => b.priority - a.priority
  );
  return (
    <>
      <Button
        sx={{ marginTop: 6 }}
        onClick={() => {
          updateTask("bucketList", data[0].id, {
            skills: [...data[0].doc.skills, { name: "add here", priority: 0 }],
          });
        }}
      >
        +
      </Button>
      <Card
        elevation={10}
        sx={{
          marginTop: 1,
          marginLeft: 40,
          p: 4,
          maxWidth: "50vw",
          height: "100vh",
        }}
      >
        <CardContent>
          <List>
            {sortedList.map((item) => {
              return (
                <ListItem key={item.name}>
                  <ListItemText
                    sx={{
                      maxWidth: "20vw",
                      minWidth: "20vw",
                    }}
                    onDoubleClick={() => {
                      setShowInput(item.name);
                      setValue(item.name);
                    }}
                  >
                    {showInput !== item.name && (
                      <Typography variant="body1">
                        {" "}
                        {item.name.toUpperCase()}
                      </Typography>
                    )}

                    {showInput === item.name && (
                      <TextField
                        autoFocus
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => {
                          const { doc } = data[0];
                          const index = doc.skills.findIndex(
                            (e) => e.name === item.name
                          );
                          const docTobeUpdated = doc.skills[index];
                          updateTask("bucketList", data[0].id, {
                            skills: [
                              ...doc.skills.slice(0, index),
                              {
                                name: value,
                                priority: docTobeUpdated.priority,
                              },
                              ...doc.skills.slice(index + 1),
                            ],
                          });
                          setShowInput(null);
                        }}
                      />
                    )}
                  </ListItemText>
                  <ListItemText>
                    <Button
                      sx={{
                        fontSize: 20,
                      }}
                      onClick={() => UpdatePriority(item, "add")}
                    >
                      +
                    </Button>
                    <Button
                      size="small"
                      disableElevation
                      disableRipple
                      disabled
                    >
                      <Typography component={"span"} variant="h5">
                        {item.priority}
                      </Typography>
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        fontSize: 20,
                      }}
                      onClick={() => {
                        UpdatePriority(item, "sub");
                      }}
                    >
                      -
                    </Button>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default DataProvider;
