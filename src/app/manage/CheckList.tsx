import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { updateTask } from '../../../lib/fetch';
import { Day } from './DayCard';
import { Task } from '@/models/checklist/daily/daily';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckListContainer } from './styles';

interface CheckListProps {
  mode: string;
  day: Day['day'];
  task: Task;
}

function CheckList({ mode, day, task }: CheckListProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const theme = useTheme();

  const handleOpen = () => {
    setValue('');
    setEditingIndex(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const updateSubTasks = (updatedSubTasks: { text: string; status: boolean }[]) => {
    const updatedTasks = day.tasks.map((t) =>
      t.text === task.text ? { ...t, subTasks: updatedSubTasks } : t
    );

    updateTask(`manage${mode}`, day.title, {
      ...day,
      tasks: updatedTasks,
    });
  };

  const handleSave = () => {
    const updatedSubTasks = [...(task.subTasks ?? [])];
    if (editingIndex !== null) {
      updatedSubTasks[editingIndex] = {
        ...updatedSubTasks[editingIndex],
        text: value,
      };
    } else {
      updatedSubTasks.push({ text: value, status: false });
    }
    updateSubTasks(updatedSubTasks);
    setOpen(false);
  };

  return (
    <Box sx={{ color: 'GrayText' }}>
      <Typography
        fontWeight={600}
        fontSize={15}
        color="inherit"
        mt={1}
        mb={1}
        textTransform="uppercase"
      >
        Subtasks
      </Typography>
      <CheckListContainer>
        {task.subTasks?.map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            p={1.2}
            mb={0.8}
            borderRadius={1}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: 'white',
            }}
          >
            <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => {
                  const updated = task.subTasks!.map((sub, i) =>
                    i === index ? { ...sub, status: !sub.status } : sub
                  );
                  updateSubTasks(updated);
                }}
                style={{ accentColor: theme.palette.info.main }}
              />
              <Typography
                sx={{
                  textDecoration: item.status ? 'line-through' : 'none',
                  fontSize: 14,
                  color: 'inherit',
                }}
              >
                {item.text}
              </Typography>
            </Box>

            <Box display="flex" gap={1}>
              <IconButton
                size="small"
                onClick={() => {
                  setValue(item.text);
                  setEditingIndex(index);
                  setOpen(true);
                }}
                sx={{
                  color: 'white',
                  '&:hover': { color: theme.palette.info.main },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={() => {
                  const updated = task.subTasks!.filter((_, i) => i !== index);
                  updateSubTasks(updated);
                }}
                sx={{ color: theme.palette.error.main }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </CheckListContainer>

      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        sx={{
          mt: 1,
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            borderColor: theme.palette.info.main,
            color: theme.palette.info.main,
          },
        }}
      >
        + Add Subtask
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Stack spacing={2} p={2} minWidth="300px">
          <TextField
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Enter subtask"
            fullWidth
            autoFocus
          />
          <Button variant="contained" onClick={handleSave}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Stack>
      </Dialog>
    </Box>
  );
}

export default CheckList;
