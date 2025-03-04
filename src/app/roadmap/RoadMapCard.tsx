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
  ListItemIcon,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { Colors, RoadMaps } from "./types";
import { useState } from "react";
import { updateTask } from "../../../lib/fetch";
import SwapVertIcon from '@mui/icons-material/SwapVert';



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
  maxHeight: "89vh",
};
const colors: Colors[] = ["primary", "warning", "success","error"];
function RoadMapCard({ item, id }: { item: RoadMaps; id: string }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [showNote, setShowNote] = useState<string | null>(null);
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState("add note here");
  const theme = useTheme();

  const topicTobeEdited = item.topics.find((el) => el.title === showNote);
  return (
    <>
      <Modal open={showNote ? true : false} onClose={() => setShowNote(null)} >
        <div >

        <Paper elevation={10} >
          <Box  sx={style} >
            <div
              onDoubleClick={() => {
                setEditNote(true);
              }}
            >
              <Box
                sx={{
                  bgcolor:"lightBlue",
                  maxHeight: "80vh",
                 
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
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none", // Prevent border on hover
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "black",
                        letterSpacing:"1.4px" // Change text color
                      },
                    }}
                  />
                )}
                {!editNote && 
                <pre>
                  <Typography 
                  className="font"
                  color="rgb(0,0,0,0.8)"
                  align="left"
                  maxWidth={"50vw"}
                  whiteSpace={"break-spaces"}
                  p={3}
                  variant="body1"
                  fontSize={16}
                  fontWeight={500}
                  letterSpacing={0.8}
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
                    { title: itemTobeUpdated.title, note: note ,order:itemTobeUpdated.order},
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

        </div>
       
      </Modal>
      <Card elevation={10} sx={{margin:"16px"}}>
        {showInput !== item.title && (
          <Button
            fullWidth
            color={item.color}
            variant="contained"
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
            minHeight: "400px",
            maxHeight: "400px",
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
          <List  sx={{ marginLeft: "16px" }}>
            {item.topics.toSorted((a,b)=>b.order-a.order).map((topic) => (
              <ListItem 
              divider
              
              key={topic.title} sx={{ m: 0, p: 0 }}>
                <ListItemText
                 
                 
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
                      variant="body1"
                      fontSize={15}
                      align="left"
                      lineHeight={2}
                      letterSpacing={1.3}
                      fontWeight={500}
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
                            { title: value, note: itemTobeUpdated.note,order:itemTobeUpdated?.order||0 },
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
                <ListItemIcon  
                  onClick={() => {
                    setShowNote(topic.title);
                    setNote(topic.note);
                  }}>
                  
                  <InfoIcon sx={{cursor:"pointer"}} color={topic?.note?.length<15?"disabled":"info"}/>
                
                </ListItemIcon>
                <ListItemIcon 
                
                onDoubleClick={()=>{
                  const index = item.topics.findIndex(
                    (item) => item.title === topic.title
                  );

                  const itemTobeUpdated = item.topics[index];
                    updateTask(`rm-${item.stack}`, id, {
                      ...item,
                      topics: [
                        ...item.topics.slice(0, index),
                        { title: itemTobeUpdated.title, note: itemTobeUpdated.note,order:(itemTobeUpdated?.order || 0)-1 },
                        ...item.topics.slice(index + 1),
                      ],
                    });
                }}
                
                onClick={()=>{

                   const index = item.topics.findIndex(
                    (item) => item.title === topic.title
                  );

                  const itemTobeUpdated = item.topics[index];
                    updateTask(`rm-${item.stack}`, id, {
                      ...item,
                      topics: [
                        ...item.topics.slice(0, index),
                        { title: itemTobeUpdated.title, note: itemTobeUpdated.note,order:(itemTobeUpdated?.order || 0)+1 },
                        ...item.topics.slice(index + 1),
                      ],
                    });
                }}>
                  <SwapVertIcon sx={{cursor:"pointer", "&:hover": {
            color: "secondary.main", // Change to secondary color on hover
          },}} color="primary"/>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActionArea sx={{display:"flex",flexDirection:"row"}}>
          <Button
            fullWidth
            color="success"
            variant="text"
            onClick={() => {
              updateTask(`rm-${item.stack}`, id, {
                ...item,
                topics: [
                  ...item.topics,
                  { title: `add - ${new Date().getMilliseconds().toString().slice(-4)}`, note: "add note here" ,order:1},
                ],
              });
            }}
          >
            +
          </Button>
          <Box sx={{display:"flex",flexDirection:"row"}}>
          <Button color="success" sx={{fontSize:"8px"}} onClick={()=>{
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[2]}`,
            });
          }}>Done</Button>
          <Button color="warning" sx={{fontSize:"8px"}} onClick={()=>{
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[1]}`,
            });
          }}>prog</Button>
          <Button color="error" sx={{fontSize:"8px"}} onClick={()=>{
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[3]}`,
            });
          }}>pend</Button>
          <Button color="primary" sx={{fontSize:"8px"}} onClick={()=>{
            updateTask(`rm-${item.stack}`, id, {
              ...item,
              color: `${colors[0]}`,
            });
          }}>reset</Button>
          </Box>
          
         
        </CardActionArea>
      </Card>
    </>
  );
}

export default RoadMapCard;


