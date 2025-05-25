import React, { useState } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { RoadMaps, Topic } from './types';
import ControlButton from './ControlButton';
import { StyledNoteBox, StyledTextInput, TextStyles } from './Styles';
import LinkIcon from './LinkIcon';
import { findIndex, UpdateRoadMap } from '@/models/RoadMap/RoadMap';
import CONSTANTS from './constants';

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


function Link({ item, id, topic }: LinkProps) {
  const [showNote, setShowNote] = useState<string | null>(null);
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState('add note here');
  const topicTobeEdited = item.topics.find((el) => el.title === showNote);

  const handleSave = async () => {
    const index = findIndex(item,topicTobeEdited!)
    const action = CONSTANTS.ADD_LINK_ACTION;
    action.value = note;
    await UpdateRoadMap(item,id,index,action);
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
                <StyledNoteBox height={"10vh"}>
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
                        textAlign={"left"}
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
