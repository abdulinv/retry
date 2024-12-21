import React, { useState } from "react";
import { Jobs } from "./types";
import {
  Card,
  CardContent,
  ListItem,
  Typography,
  List,
  ListItemText,
  TextField,
  CardActionArea,
  Button,
  useTheme,
} from "@mui/material";
import { updateTask } from "../../../lib/fetch";

function JobCard({ item, id }: { item: Jobs; id: string }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const theme = useTheme();
  const sortedList = item.skills.toSorted((a, b) => b.count - a.count);
  return (
    <Card elevation={10}>
      {showInput !== item.designation && (
        <Button
          onDoubleClick={() => {
            setShowInput(item.designation);
          }}
          fullWidth
          variant="contained"
        >
          {item.designation.toUpperCase()}
        </Button>
      )}

      {showInput === item.designation && (
        <TextField
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onBlur={() => {
            updateTask("jobs", id, {
              ...item,
              designation: value,
            });
            setShowInput(null);
          }}
        />
      )}
      <CardContent
        sx={{
          height: "70vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <List>
          {sortedList.map((skill) => {
            return (
              <ListItem key={skill.name}>
                <ListItemText onDoubleClick={() => setShowInput(skill.name)}>
                  {showInput !== skill.name && (
                    <Typography fontSize={15} variant="subtitle2">
                      {skill.name.toUpperCase()}
                    </Typography>
                  )}
                  {showInput === skill.name && (
                    <TextField
                      autoFocus
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={() => {
                        const index = item.skills.findIndex(
                          (e) => e.name === skill.name
                        );

                        updateTask("jobs", id, {
                          ...item,
                          skills: [
                            ...item.skills.slice(0, index),
                            { name: value, count: skill.count },
                            ...item.skills.slice(index + 1),
                          ],
                        });
                        setShowInput(null);
                      }}
                    />
                  )}
                </ListItemText>

                <Button
                  disableRipple
                  onClick={() => {
                    const index = item.skills.findIndex(
                      (e) => e.name === skill.name
                    );
                    const doc = item.skills[index];

                    console.log("from this ", doc);
                    updateTask("jobs", id, {
                      ...item,
                      skills: [
                        ...item.skills.slice(0, index),
                        { name: doc.name, count: doc.count + 1 },
                        ...item.skills.slice(index + 1),
                      ],
                    });
                  }}
                  variant="contained"
                  sx={{
                    borderRadius: "50%",
                    minWidth: "48px",
                    minHeight: "48px",
                    padding: "12px",
                  }}
                  color="success"
                >
                  {skill.count}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActionArea>
        <Button
          onClick={() => {
            updateTask("jobs", id, {
              ...item,
              skills: [
                ...item.skills,
                { name: "add new skill here", count: 0 },
              ],
            });
          }}
        >
          +
        </Button>
      </CardActionArea>
    </Card>
  );
}

export default JobCard;
