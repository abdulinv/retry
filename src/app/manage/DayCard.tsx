'use client';

import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Card,
  ListItemText,
  CardActionArea,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { updateTask } from '../../../lib/fetch';
import { Duration } from '@/models/checklist/daily/daily';
import { parseCustomDate } from '@/utils/helper';
import CheckList from './CheckList';
import TagControl from './TagControl';
import DateSection from './DateSection';
import ProgressControl from './ProgressControl';
import DurationControl from './DurationControl';
import HeadingBar from './HeadingBar';
import InputControl from './InputControl';
import TitleControl from './TitleControl';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { StyledCardContent } from './styles';
import StatusControl from './StatusControl';

export interface Day {
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
      subTasks: {
        text: string;
        status: boolean;
      }[];
      completedOn?: string;
      openedOn?: string;
      updatedOn?: string;
      tag?: string;
    }[];
  };
  autoUpdateDaily: (value: string) => void;
  updateWeeklyDuration: (duration: Duration, text: string) => void;
  mode: string;
  dragItem: string;
  setDragItem: (arg: string) => void;
  taskStart: string | null;
  setTaskStart: (arg: string | null) => void;
}

function DayCard({
  day,
  updateWeeklyDuration,
  mode,
  dragItem,
  taskStart,
  setTaskStart,
}: Day) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [expand, setExpand] = useState<null | string>(null);

  const [tab, SetTab] = useState('Open');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    tag: '',
    date: '',
  });

  const { slug } = useParams();

  useEffect(() => {
    console.log(value)
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
    headingColor = day.title === 'january2025' ? 'success' : 'info';
  }
  let filteredTasks = day.tasks;

  if (mode === 'Monthly') {
    filteredTasks = day.tasks
      .filter((item) => item.status === tab)
      .filter((item) =>
        item.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
  }

  if (filter?.tag) {
    filteredTasks = filteredTasks.filter((item) => item.tag === filter.tag);
  }

  if (filter?.date) {
    if (tab === 'Close') {
      filteredTasks = filteredTasks.filter((item) => {
        const taskDate = new Date(item.completedOn ?? '');
        return taskDate >= new Date(filter.date);
      });
    }
    if (tab === 'Open') {
      filteredTasks = filteredTasks.filter((item) => {
        const taskDate = new Date(item.updatedOn ?? '');
        return taskDate >= new Date(filter.date);
      });
    }
  }

  const sortedTasks = filteredTasks.toSorted(
    (a, b) =>
      parseCustomDate(b.updatedOn || '') - parseCustomDate(a.updatedOn || '')
  );

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
        const {
          duration: prevDuration,
          tag,
          subTasks,
        } = day.tasks.filter((item) => item.text === text)[0];

        const total =
          ((prevDuration?.hh ?? 0) + hours) * 60 +
          (prevDuration?.mm ?? 0) +
          minutes;
        const prevHH = Math.floor(total / 60);
        const prevMM = total % 60;

        updateTask(`manage${mode}`, day.title, {
          ...day,
          tasks: [
            ...tasks,
            {
              text: text,
              status: 'Open',
              duration: { hh: prevHH, mm: prevMM },
              updatedOn: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
              tag: tag,
              subTasks,
            },
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

  const handleCollapse = (text: string) => {
    if (text === expand) setExpand(null);
    else setExpand(text);
  };

  const handleAddTask = (title: string) => {
    console.log('title', title);
    updateTask(`manage${mode}`, day.title, {
      ...day,
      tasks: [
        ...day.tasks,
        { text: title, status: 'Planned', completedOn: '', subTasks: [] },
      ],
    });
  };

  const handleTabChange = (tab: string) => {
    SetTab(tab);
  };

  const handleFilter = (filterData: { tag: string; date: string }) => {
    setFilter(filterData);
  };

  const handleCancel = () => {
    setFilter({
      tag: '',
      date: '',
    });
  };
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
          <HeadingBar
            mode={mode}
            tab={tab}
            handleTabChange={handleTabChange}
            handleCancel={handleCancel}
            handleFilter={handleFilter}
            day={day}
            heading={heading}
            headingColor={headingColor}
            search={search}
            setSearch={setSearch}
          />

          <StyledCardContent>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {sortedTasks.map((task, i) => {
                return (
                  <ListItem key={i} sx={{ display: 'flex' }}>
                    <ListItemText
                      onDoubleClick={() => {
                        setShowInput(task.text);
                        setValue(task.text);
                      }}
                    >
                      {
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4,
                            border: '1px solid grey',
                            padding: 2,
                            borderRadius: 1.5,
                            color: taskStart === task.text ? 'white' : 'black',
                            opacity: taskStart === task.text ? 1 : 0.9,
                            backgroundColor:
                              taskStart === task.text ? '#6F9062' : '#1A237E',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexGrow: 1,
                              flexDirection: 'column',
                              gap: 1,
                              color: 'inherit',
                            }}
                          >
                            <Stack
                              flexDirection={'row'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              color={'GrayText'}
                              px={0.5}
                            >
                              <Typography color="inherit">
                                {task.text}
                              </Typography>
                              <Stack flexDirection={'row'}>
                                <Button
                                  disabled={slug !== 'Daily'}
                                  color="inherit"
                                  onClick={() => handleStartTask(task.text)}
                                >
                                  {taskStart === task.text ? 'end' : 'start'}
                                </Button>

                                <IconButton
                                  color="inherit"
                                  onClick={handleCollapse.bind(null, task.text)}
                                >
                                  {expand === task.text ? (
                                    <ArrowUpward color="inherit" />
                                  ) : (
                                    <ArrowDownward color="inherit" />
                                  )}
                                </IconButton>
                              </Stack>
                            </Stack>
                            {expand === task.text && (
                              <Stack gap={1}>
                                <Stack
                                  flexDirection={'row'}
                                  justifyContent={'space-between'}
                                >
                                  <DateSection task={task} />
                                  
                                  <TagControl
                                    mode={mode}
                                    day={day}
                                    task={task}
                                  />
                                  <StatusControl mode={mode} day={day} task={task}/>
                                </Stack>

                                <TitleControl
                                  task={task}
                                  showInput={showInput}
                                  onEdit={() => {
                                    setShowInput(task.text);
                                    setValue(task.text);
                                  }}
                                />
                                <InputControl
                                  setShowInput={() => setShowInput(null)}
                                  day={day}
                                  task={task}
                                  mode={mode}
                                  showInput={showInput}
                                />
                                <DurationControl task={task} />
                                <ProgressControl mode={mode} task={task} />
                                {task.status !== "Planned" && 
                                  <CheckList mode={mode} day={day} task={task} /> }
                                
                              </Stack>
                            )}
                          </Box>
                        </Box>
                      }
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </StyledCardContent>
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
