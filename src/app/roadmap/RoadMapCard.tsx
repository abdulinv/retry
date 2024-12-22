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
  Modal,
  Box,
  Paper,
} from "@mui/material";
import { Colors, RoadMaps } from "./types";
import { useState } from "react";
import { updateTask } from "../../../lib/fetch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "52vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 2,
  height: "89vh",
};
const colors: Colors[] = ["primary", "warning", "success", "info", "error"];
function RoadMapCard({ item, id }: { item: RoadMaps; id: string }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(0);
  const [showNote, setShowNote] = useState<string | null>(null);
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState("add note here");
  const theme = useTheme();

  const topicTobeEdited = item.topics.find((el) => el.title === showNote);
  return (
    <>
      <Modal open={showNote ? true : false} onClose={() => setShowNote(null)}>
        <Paper elevation={10}>
          <Box sx={style}>
            <div
              onDoubleClick={() => {
                setEditNote(true);
              }}
            >
              <Box
                sx={{
                  bgcolor:"black",
                  maxHeight: "80vh",
                  minHeight: "80vh",
                  marginBottom:1,
                  overflowY: "scroll",
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
                {editNote && (
                  <TextField
                    fullWidth
                    multiline
                    rows={27}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
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
                {!editNote && 
                <pre>
                  <Typography 
                  color="white"
                  align="left"
                  p={3}
                  variant="body1"
                  fontSize={18}
                  fontWeight={500}
                  letterSpacing={1.4}
                  lineHeight={1.5}
                  >{topicTobeEdited?.note}</Typography>
                </pre>
                }
              </Box>
            </div>
            <Box display={"flex"} gap={4} justifyContent={"center"}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                const index = item.topics.findIndex(
                  (item) => item.title === topicTobeEdited?.title
                );
                const itemTobeUpdated = item.topics[index];
                updateTask(`rm-${item.stack}`, id, {
                  ...item,
                  topics: [
                    ...item.topics.slice(0, index),
                    { title: itemTobeUpdated.title, note: note },
                    ...item.topics.slice(index + 1),
                  ],
                });
                setEditNote(false);
              }}
            >
              Save Note
            </Button>
            <Button
              color="warning"
              variant="outlined"
              onClick={() => {
                setShowNote(null);
              }}
            >
              Close
            </Button>
            </Box>
           
          </Box>
        </Paper>
      </Modal>
      <Card elevation={10}>
        {showInput !== item.title && (
          <Button
            fullWidth
            color={item.color}
            variant="contained"
            onClick={() => {
              setStatus((prev) => {
                if (prev < 4) return prev + 1;
                else return 0;
              });
              updateTask(`rm-${item.stack}`, id, {
                ...item,
                color: `${colors[status]}`,
              });
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
              <ListItem key={topic.title} sx={{ m: 0, p: 0 }}>
                <ListItemText
                  onClick={() => {
                    setShowNote(topic.title);
                    setNote(topic.note);
                  }}
                  onDoubleClick={() => {
                    setShowInput(topic.title);
                    setValue(topic.title);
                  }}
                >
                  {showInput !== topic.title && (
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      variant="body2"
                      fontSize={15}
                      align="left"
                    >
                      {topic.title}
                    </Typography>
                  )}

                  {showInput === topic.title && (
                    <TextField
                      value={value}
                      autoFocus
                      size="small"
                      fullWidth
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={() => {
                        const index = item.topics.findIndex(
                          (item) => item.title === topic.title
                        );
                        const itemTobeUpdated = item.topics[index];
                        updateTask(`rm-${item.stack}`, id, {
                          ...item,
                          topics: [
                            ...item.topics.slice(0, index),
                            { title: value, note: itemTobeUpdated.note },
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
                topics: [
                  ...item.topics,
                  { title: "add here", note: "add note here" },
                ],
              });
            }}
          >
            +
          </Button>
        </CardActionArea>
      </Card>
    </>
  );
}

export default RoadMapCard;
