import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  CardActionArea,
  Button,
  useTheme,
} from "@mui/material";
import { RoadMaps } from "./types";
import { useState } from "react";
import { updateTask } from "../../../lib/fetch";

function RoadMapCard({ item, id }: { item: RoadMaps; id: string }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(false);
  const theme = useTheme();
  return (
    <Card elevation={10}>
      {showInput !== item.title && (
        <Button
          fullWidth
          color={!status?"primary":"success"}
          variant="contained"
          onClick={() => {
            setStatus((prev) => !prev);
          }}
          onDoubleClick={() => {
            setShowInput(item.title);
            setValue(item.title);
          }}
        >
          <Typography
            align="center"
            variant="subtitle1"
            fontWeight={900}
            fontSize={14}
          >
            {item.title}
          </Typography>
        </Button>
      )}
      {showInput === item.title && (
        <TextField
          value={value}
          autoFocus
          size="small"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            // const index = item.topics.findIndex((item) => item === topic);
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              title: value,
            });
            setShowInput(null);
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
      <CardContent
        sx={{
          minHeight: "250px",
          maxHeight: "250px",
          overflow: "auto",
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
        <List sx={{ marginLeft: "16px" }}>
          {item.topics.map((topic) => (
            <ListItem key={topic} sx={{ m: 0, p: 0 }}>
              <ListItemText
                onDoubleClick={() => {
                  setShowInput(topic);
                  setValue(topic);
                }}
              >
                {showInput !== topic && (
                  <Typography variant="body2" fontSize={15} align="left">
                    {topic}
                  </Typography>
                )}

                {showInput === topic && (
                  <TextField
                    value={value}
                    autoFocus
                    size="small"
                    fullWidth
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => {
                      const index = item.topics.findIndex(
                        (item) => item === topic
                      );
                      updateTask(`rm-${item.stack}`, id, {
                        ...item,
                        topics: [
                          ...item.topics.slice(0, index),
                          value,
                          ...item.topics.slice(index + 1),
                        ],
                      });
                      setShowInput(null);
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
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActionArea>
        <Button
          fullWidth
          color="success"
          variant="text"
          onClick={() => {
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              topics: [...item.topics, "add here"],
            });
          }}
        >
          +
        </Button>
      </CardActionArea>
    </Card>
  );
}

export default RoadMapCard;
