import React from 'react';
import {
  Card,
  List,
  ListItem,
  Typography,
  Modal,
  Box,
  Paper,
} from '@mui/material';
import { RoadMaps, Topic } from './types';
import { useState } from 'react';
import Link from './Link';
import ControlButton from './ControlButton';
import {
  StyledCardContent,
  StyledNoteBox,
  StyledTextInput,
  TextStyles,
} from './Styles';
import CardHeading from './CardHeading';
import SortControl from './SortControl';
import NoteControl from './NoteControl';
import TitleControl from './TitleControl';
import CardControl from './CardControl';
import DateControl from './DateControl';
import { UpdateRoadMap, UpdateRoadMapCard } from '@/models/RoadMap/RoadMap';
import DeleteControl from './DeleteControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '53vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 2,
  maxHeight: '90vh',
};

interface RoadMapProps{
  item: RoadMaps; 
  id: string;
}
function RoadMapCard({ item, id}: RoadMapProps) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [showNote, setShowNote] = useState<string | null>(null);
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState('add note here');

  const topicTobeEdited = item.topics.find((el) => el.title === showNote);

  const handleSave = async () => {
    const index = item.topics.findIndex(
      (item) => item.title === topicTobeEdited?.title
    );
    const action = {
      prop:"note",
      value:note
    }
    await UpdateRoadMap(item,id,index,action)
    setEditNote(false);
    setShowNote(null);
  };

  const handleClose = () => {
    setShowNote(null);
    setEditNote(false);
  };

  const handleEnableEdit = (topic: Topic | RoadMaps, property: string) => {
    switch (property) {
      case 'title':
        setShowInput(topic.title);
        setValue(topic.title);
        break;
      case 'note':
        setShowNote(topic.title);
        if (topic.note) setNote(topic?.note as string);
        break;
    }
  };

  const handleTitleChange = async () => {
    const action = {
      prop:"title",
      value:value
    }
    await UpdateRoadMapCard(item,id,action)
    setShowInput(null);
  };

  const handleTopicUpdate = (topic: Topic) => {
    const index = item.topics.findIndex((item) => item.title === topic.title);
    console.log("index check",index,item.title,topic.title)
    const action = {
      prop:"title",
      value:value
    }
    UpdateRoadMap(item,id,index,action)
    setShowInput(null);
  };

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
                <StyledNoteBox height={'80vh'}>
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
                      <Typography textAlign={"left"}  sx={TextStyles} variant="body1">
                        {topicTobeEdited?.note}
                      </Typography>
                    </pre>
                  )}
                </StyledNoteBox>
              </div>
              <ControlButton
                handleClose={handleClose}
                handleSave={handleSave}
                confirmButtonText="Save Note"
                cancelButtonText="Close"
              />
            </Box>
          </Paper>
        </div>
      </Modal>
      <Card elevation={10} sx={{ margin: '16px' }}>
        <CardHeading
          handleTitleChange={handleTitleChange}
          handleTitleEdit={handleEnableEdit}
          showInput={showInput}
          item={item}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <StyledCardContent>
          <List sx={{ marginLeft: '16px' }}>
            {item.topics
              .toSorted((a, b) => b.order - a.order)
              .map((topic) => (
                <ListItem divider key={topic.title} sx={{ m: 0, p: 0 }}>
                  {/* title */}
                  <TitleControl
                    handleEnableEdit={handleEnableEdit}
                    topic={topic}
                    onChange={(val) => setValue(val)}
                    onBlur={() => {
                      handleTopicUpdate(topic);
                    }}
                    value={value}
                    showInput={showInput}
                  />
                  {/* date */}
                  <DateControl topic={topic} item={item} id={id}/>
                  {/* link */}
                  <Link item={item} id={id} topic={topic} />
                  {/* note */}
                  <NoteControl
                    topic={topic}
                    handleEnableEdit={handleEnableEdit}
                  />
                  {/* sort */}
                  <SortControl topic={topic} item={item} id={id} />
                  <DeleteControl id={id} item={item} topic={topic}/>
                </ListItem>
              ))}
          </List>
        </StyledCardContent>
        <CardControl item={item} id={id} />
      </Card>
    </>
  );
}

export default RoadMapCard;
