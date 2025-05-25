import React, { useState } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { updateTask } from '../../../lib/fetch';
import { RoadMaps, Topic } from './types';
import ControlButton from './ControlButton';
import { StyledNoteBox, StyledTextInput } from './Styles';
import LinkIcon from './LinkIcon';

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
  item: RoadMaps;
  id: string;
  topic: Topic;
}

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
  const topicTobeEdited = item.topics.find((el) => el.title === showNote);

  const handleSave = async () => {
    const index = item.topics.findIndex(
      (item) => item.title === topicTobeEdited?.title
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

  const handleClose = () => {
    setShowNote(null);
    setEditNote(false);
  };

  const handleAddLink = ()=>{
    setShowNote(topic.title);
    setNote(topic.link);
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
                <StyledNoteBox>
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
                </StyledNoteBox>
              </div>
              <ControlButton
                handleClose={handleClose}
                handleSave={handleSave}
                confirmButtonText="Save Link"
                cancelButtonText="Close"
              />
            </Box>
          </Paper>
        </div>
      </Modal>
      <LinkIcon handleClick={handleAddLink} link={topic.link}/>
    </>
  );
}

export default Link;
