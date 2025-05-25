import React, { useState } from 'react';
import {
  ListItemIcon,
  Modal,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  styled,
} from '@mui/material';
import { updateTask } from '../../../lib/fetch';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LaunchIcon from '@mui/icons-material/Launch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '52vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 2,
  maxHeight: '89vh',
};

interface LinkProps {
  item: any;
  id: string;
  topic: any;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'lightBlue',
  maxHeight: '80vh',
  marginBottom: 1,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
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
}));

const StyledTextInput = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none', // Prevent border on hover
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    color: 'black',
    letterSpacing: '1.4px', // Change text color
  },
}));

const TextStyles = {
  color: 'rgb(0,0,0,0.8)',
  align: 'left',
  maxWidth: '50vw',
  whiteSpace: 'break-spaces',
  p: 3,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.8,
  lineHeight: 1.5,
};

function Link({ item, id, topic }: LinkProps) {
  const [showNote, setShowNote] = useState<string | null>(null);
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState('add note here');
  const topicTobeEdited = item.topics.find((el: any) => el.title === showNote);

  const handleSave = async () => {
    const index = item.topics.findIndex(
      (item: any) => item.title === topicTobeEdited?.title
    );
    const itemTobeUpdated = item.topics[index];
    await updateTask(`rm-${item.stack}`, id, {
      ...item,
      topics: [
        ...item.topics.slice(0, index),
        {
          title: itemTobeUpdated.title,
          note: itemTobeUpdated.note,
          order: itemTobeUpdated.order,
          link: note,
        },
        ...item.topics.slice(index + 1),
      ],
    });
    setEditNote(false);
    setShowNote(null);
  };

  const handleClose = ()=>{
    setShowNote(null);
    setEditNote(false);
  }
  return (
    <>
      <Modal open={showNote ? true : false} onClose={handleClose}>
        <div>
          <Paper elevation={10}>
            <Box sx={style}>
              <div
                onDoubleClick={() => {
                  setEditNote(true);
                }}
              >
                <StyledBox>
                  {editNote && (
                    <StyledTextInput
                      fullWidth
                      multiline
                      rows={27}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  )}
                  {!editNote && (
                    <pre>
                      <Typography
                        className="font"
                        sx={TextStyles}
                        variant="body1"
                      >
                        {topicTobeEdited?.link}
                      </Typography>
                    </pre>
                  )}
                </StyledBox>
              </div>
              <Box display={'flex'} gap={4} justifyContent={'center'}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  Save Link
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Paper>
        </div>
      </Modal>
      <Stack
        flexDirection={'row'}
        gap={0}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <ListItemIcon
          onClick={() => {
            setShowNote(topic.title);
            setNote(topic.link);
          }}
        >
          <InsertLinkIcon sx={{ m: 0, p: 0 }} />
        </ListItemIcon>
        <a href={topic.link} target="blank">
          <LaunchIcon
            sx={{
              m: 0,
              p: 0,
              ml: -10,
            }}
            color="primary"
            fontSize="inherit"
          />
        </a>
      </Stack>
    </>
  );
}

export default Link;
