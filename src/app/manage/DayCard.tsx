'use client';

import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Card,
  CardContent,
  ListItemText,
  CardActionArea,
  Button,
  TextField,
  useTheme,
  Box,
  Typography,
  LinearProgress,
  Stack,
} from '@mui/material';

interface Day {
  day: {
    id?: number;
    category?: string;
    title: string;
    order: number;
    tasks: {
      text: string;
      status: string;
      duration?: {
        hh: number;
        mm: number;
      };
    }[];
  };
  autoUpdateDaily: (value: string) => void;
  updateWeeklyDuration: (duration: Duration, text: string) => void;
  mode: string;
  dragItem: string;
  setDragItem: (arg: string) => void;
}

import { useParams } from 'next/navigation';
import { updateTask } from '../../../lib/fetch';
import { Duration } from '@/models/checklist/daily/daily';

function DayCard({
  day,
  autoUpdateDaily,
  updateWeeklyDuration,
  mode,
  dragItem,
  setDragItem,
}: Day) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [taskStart, setTaskStart] = useState<null | string>(null);
  const [tab,SetTab] = useState("Open");

  const { slug } = useParams();
  const theme = useTheme();

  useEffect(() => {
    if (localStorage.getItem('activeTask')) {
      const startedTask = JSON.parse(localStorage.getItem('activeTask')!).task;
      console.log('task local', startedTask);
      if (startedTask) setTaskStart(startedTask);
    }
  }, []);

  let heading: string;
  let headingColor: 'info' | 'success' = 'info';
  if (mode === 'Daily') {
    heading =
      'Daily Tasks for ' +
      [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Sataurday',
      ][Number(day.title.slice(-1)) - 1];
    headingColor =
      new Date().getDay() + 1 == Number(day.title.slice(-1))
        ? 'success'
        : 'info';
  } else if (mode === 'Weekly') {
    heading = 'The Week is';
    headingColor =
      Math.ceil(new Date().getDate() / 7) == Number(day.title.slice(-1))
        ? 'success'
        : 'info';
  } else {
    heading = 'Over all tasks summary ';
    headingColor = new Date().getMonth() == day.order + 3 ? 'success' : 'info';
  }
  let filteredTasks = day.tasks;
  if(mode === "Monthly")
    filteredTasks = day.tasks.filter(item=>item.status === tab);
  const sortedTasks = filteredTasks.toSorted((a, b) => (a.text > b.text ? 1 : -1));
  
  const handleStartTask = (text: string) => {
    if (taskStart === text) {
      setTaskStart(null);
      let startTime;
      if (localStorage.getItem('activeTask')) {
        startTime = new Date(
          JSON.parse(localStorage.getItem('activeTask')!).start
        );
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const tasks = day.tasks.filter((item) => item.text !== text);
        const { duration: prevDuration } = day.tasks.filter(
          (item) => item.text === text
        )[0];

        const total =
          ((prevDuration?.hh ?? 0) + hours) * 60 +
          (prevDuration?.mm ?? 0) +
          minutes;
        const prevHH = Math.floor(total / 60);
        const prevMM = total % 60;

        updateTask(`manage${slug}`, day.title, {
          ...day,
          tasks: [
            ...tasks,
            { text: text, status: "Open", duration: { hh: prevHH, mm: prevMM } },
          ],
        });
        updateWeeklyDuration({ hh: hours, mm: minutes }, text);
      }

      localStorage.setItem(
        'activeTask',
        JSON.stringify({ task: null, start: null })
      );
    } else {
      setTaskStart(text);
      localStorage.setItem(
        'activeTask',
        JSON.stringify({ task: text, start: new Date() })
      );
    }
  };

  const handleAddTask = (title: string) => {
    console.log('title', title);
    updateTask(`manage${mode}`, day.title, {
      ...day,
      tasks: [...day.tasks, { text: title, status: "Planned"}],
    });
  };

  const handleTabChange = (tab:string)=>{
    SetTab(tab);
  }
  return (
    <>
      {headingColor === 'success' && (
        <Card
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            handleAddTask(dragItem);
          }}
          elevation={headingColor === 'success' ? 20 : 5}
          sx={{ opacity: headingColor === 'success' ? 1 : 0.7 }}
        >
          <Stack 
            p={0.8} 
            flexDirection={"row"} 
            alignItems={"center"} 
            justifyContent={"space-around"} 
            sx={{ color:"white", minHeight:"44px", borderRadius: 0, backgroundColor:"#1A237E" }} color={headingColor}>
            {heading}
            {mode === 'Monthly' && (
              <Stack flexDirection={'row'} m={0} p={0}>
                <Button
                sx={{color:tab === "Open"?"white":"grey"}}
                onClick={handleTabChange.bind(null,"Open")}
                size="small" variant="text">
                  Open
                </Button>
                <Button 
                  sx={{color:tab === "Close"?"white":"grey"}}
                  onClick={handleTabChange.bind(null,"Close")}
                  size="small" variant="text">
                  Closed
                </Button>
                <Button 
                   sx={{color:tab === "Planned"?"white":"grey"}}
                  onClick={handleTabChange.bind(null,"Planned")}
                  size="small" variant="text">
                  Planned
                </Button>
              </Stack>
            )}
          </Stack>

          <CardContent
            sx={{
              maxHeight: '575px',
              minHeight: '575px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {sortedTasks.map((task, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText
                      onDoubleClick={() => {
                        setShowInput(task.text);
                        setValue(task.text);
                      }}
                    >
                      {showInput !== task.text && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4,
                            border: '1px solid grey',
                            padding: 2,
                            borderRadius: 3,
                            color: 'white',
                            opacity: 0.8,
                            backgroundColor:
                              taskStart === task.text
                                ? theme.palette.success.light
                                : '#1A237E',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexGrow: 1,
                              flexDirection: 'column',
                              gap: 1,
                              color: 'white',
                            }}
                          >
                            <Typography
                              sx={{
                                cursor: 'grabbing',
                              }}
                              width={'60%'}
                              borderRadius={'12px'}
                              px={0.5}
                              draggable={true}
                              onDragStart={() => setDragItem(task.text)}
                              color='grey'
                              fontWeight={500}
                              fontSize={16}
                            >
                              {task.text}
                            </Typography>
                            {
                              <Typography
                                color="grey"
                                fontWeight={600}
                                px={0.5}
                                
                              >
                                {task.duration
                                  ? `${task.duration.hh} hours ${task.duration.mm} minuits`
                                  : '00 hours 00 minuits'}
                              </Typography>
                            }

                            {mode === 'Monthly' && (
                              <Box sx={{px:0.5}}>
                                <LinearProgress
                                  sx={{
                                   
                                    height: 12,
                                    borderRadius: 4,
                                    border: '1px solid grey',
                                  }}
                                  color={
                                    (task.duration?.hh || 0) < 20
                                      ? 'error'
                                      : (task.duration?.hh || 0) < 30
                                      ? 'warning'
                                      : 'success'
                                  }
                                  variant="determinate"
                                  value={
                                    ((task.duration?.hh || 0) * 60 +
                                      (task.duration?.mm || 0)) /
                                    60
                                  }
                                />

                                {(task.duration?.hh || 0) === 0 &&
                                  (task.duration?.mm || 0) === 0 && (
                                    <Typography
                                      color="error"
                                      variant="body2"
                                      fontSize={14}
                                      mt={0.8}
                                      px={0.1}
                                    >
                                      You are not started this task yet !
                                    </Typography>
                                  )}
                                {(task.duration?.hh || 0) > 10 &&
                                  (task.duration?.hh || 0) < 20 && (
                                    <Typography
                                      color="grey"
                                      variant="body2"
                                      fontSize={14}
                                      mt={0.8}
                                      px={0.1}
                                    >
                                      You are making progress...💪 keep going
                                    </Typography>
                                  )}
                                {(task.duration?.hh || 0) > 75 &&
                                  (task.duration?.hh || 0) < 95 && (
                                    <Typography
                                      color="info"
                                      variant="body2"
                                      fontSize={14}
                                      mt={0.8}
                                      px={0.1}
                                    >
                                      you made the minimum requirement...💪
                                    </Typography>
                                  )}
                                {(task.duration?.hh || 0) > 95 &&
                                  (task.duration?.hh || 0) < 99 && (
                                    <Typography
                                       color="grey"
                                      variant="body2"
                                      fontSize={14}
                                      mt={0.8}
                                      px={0.1}
                                    >
                                      congratulations...✨
                                    </Typography>
                                  )}
                                {(task.duration?.hh || 0) > 99 &&
                                  (task.duration?.hh || 0) < 49 && (
                                    <Typography
                                      color="grey"
                                      variant="body2"
                                      fontSize={14}
                                      mt={0.8}
                                      px={0.1}
                                    >
                                      Excellent...💥💥
                                    </Typography>
                                  )}
                                {(task.duration?.hh || 0) > 100 && (
                                  <Typography
                                    color="grey"
                                    variant="body2"
                                    fontSize={14}
                                    fontWeight={500}
                                    mt={0.8}
                                    px={0.1}
                                  >
                                    Awesome...🔥🔥🔥 time to switch to another
                                    topic
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Box>

                          <Box
                            sx={{
                              backgroundColor: '#1A237E',
                              borderRadius: 1,
                              p:0

                            }}
                          >
                            {mode === 'Daily' && (
                              <Button
                                disabled={slug !== 'Daily'}
                                color="primary"
                                onClick={() => handleStartTask(task.text)}
                              >
                                {taskStart === task.text ? 'end' : 'start'}
                              </Button>
                            )}
                            {
                              mode === 'Monthly' && task.status === "Planned" && 
                              <Button variant='text' size='small' sx={{backgroundColor:"#1A237E"}} color='info'  onClick={()=>{
                                const tasks = day.tasks.filter(
                                  (item) => item.text !== task.text
                                );
                                updateTask(`manage${mode}`, day.title, {
                                  ...day,
                                  tasks: [
                                    ...tasks,
                                    {
                                      text: task.text,
                                      status: "Open",
                                      duration: task.duration,
                                    },
                                  ],
                                });
                              }}>Open task</Button>
                            }
                            {mode === 'Monthly' && task.status !== "Planned" &&(
                              <Button
                                variant='text'
                                size='small'
                                title='Mark as Complete'
                                sx={{
                                  m:0,
                                  fontSize:12
                                }}
                                disabled={task.status === "Open" && (task.duration?.hh || 0 )<100}
                                color="primary"
                                onClick={() => {
                                  if(task.status === "Open" && (task.duration?.hh || 0 )<100) 
                                     return;
                                  const tasks = day.tasks.filter(
                                    (item) => item.text !== task.text
                                  );
                                  updateTask(`manage${mode}`, day.title, {
                                    ...day,
                                    tasks: [
                                      ...tasks,
                                      {
                                        text: task.text,
                                        status: task.status === "Open"?"Close":"Open",
                                        duration: task.duration,
                                      },
                                    ],
                                  });
                                }}
                              >{task.status === "Open"?"Complete":"Open"}</Button>
                            )}
                          </Box>
                        </Box>
                      )}
                      {showInput === task.text && (
                        <TextField
                          value={value}
                          autoFocus
                          size="small"
                          fullWidth
                          onChange={(e) => setValue(e.target.value)}
                          onBlur={() => {
                            const tasks = day.tasks.filter(
                              (item) => item.text !== task.text
                            );
                            updateTask(`manage${mode}`, day.title, {
                              ...day,
                              tasks: [
                                ...tasks,
                                { text: value, status: task.status },
                              ],
                            });
                            if (
                              mode === 'Monthly' &&
                              value.includes('Daily#-')
                            ) {
                              autoUpdateDaily(value);
                            }
                            setShowInput(null);
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none', // Remove the default border
                              },
                              '&:hover fieldset': {
                                border: 'none', // Prevent border on hover
                              },
                              '&.Mui-focused fieldset': {
                                border: 'none', // Prevent border on focus
                              },
                            },
                          }}
                        />
                      )}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
          <CardActionArea>
            <Button
              onClick={() => {
                handleAddTask('add task');
              }}
            >
              +
            </Button>
            <Button
              onClick={() => {
                updateTask(`manage${slug}`, day.title, {
                  ...day,
                  tasks: [],
                });
              }}
            >
              reset
            </Button>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}

export default DayCard;
