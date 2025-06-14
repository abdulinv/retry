import {
    Button,
    Modal,
    Stack,
    Box,
    Select,
    MenuItem,
    SelectChangeEvent,
  } from '@mui/material';
  import React, { useState } from 'react';
  import { updateTask } from '../../../lib/fetch';
  import { Project } from './types';
  
  interface TagControllerProps {
    id: string;
    doc: Project;
  }
  
  function TagController({ id, doc }: TagControllerProps) {
    const [value, setValue] = useState(doc.tags?.[0] || ''); // default to existing tag
    const [open, setOpen] = useState(false);
  
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
  
    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };
  
    const handleSave = () => {
      const updatedDoc: Project = {
        ...doc,
        tags: [...doc.tags,value], 
      };
      updateTask('projects', id, updatedDoc);
      handleClose();
    };
  
    return (
      <>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              backgroundColor: 'whiteSmoke',
              height: '50vh',
              width: '50vw',
              border: '1px solid grey',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'grid',
              placeContent: 'center',
              borderRadius: '16px',
              gap: 2,
              p: 3,
            }}
          >
            <Select
              fullWidth
              color="info"
              value={value}
              onChange={handleChange}
              sx={{ width: '40vw' }}
            >
              <MenuItem value="fe">fe</MenuItem>
              <MenuItem value="be">be</MenuItem>
              <MenuItem value="fullstack">fullstack</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Modal>
  
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Button onClick={handleOpen}>
            {doc.tags?.length !== 0 ? 'Update tags' : 'Add tags'}
          </Button>
        </Stack>
      </>
    );
  }
  
  export default TagController;
  