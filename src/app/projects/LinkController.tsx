import { Button, Modal, Stack, TextField, Box, Link } from '@mui/material';
import React, { useState } from 'react';
import { updateTask } from '../../../lib/fetch';
import { Project } from './types';

interface LinkControllerProps {
  id: string;
  doc: Project;
}

function LinkController({ id, doc }: LinkControllerProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    const updatedDoc = {
      ...doc,
      clone_URL: value,
    };
    updateTask('projects', id, updatedDoc);
    handleClose();
  };

  const handleCopy = async () => {
    try {
      const textToCopy = doc.clone_URL;
      if (textToCopy) {
        await navigator.clipboard.writeText(textToCopy);
        console.log('Copied to clipboard:', textToCopy);
      } else {
        console.warn('Nothing to copy!');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: 'whiteSmoke',
            color: 'white',
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
          }}
        >
          <TextField
            fullWidth
            color="info"
            sx={{
              color: 'white',
              width: '40vw',
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
      >
        <Button onClick={handleOpen}>{doc.clone_URL ? 'Update' : 'Add'}</Button>
        {doc.clone_URL && <Button onClick={handleCopy}>Copy</Button>}

        {doc.clone_URL && (
          <Button>
            {' '}
            <Link target="blank" href={doc.clone_URL}>
              GOTO
            </Link>
          </Button>
        )}
      </Stack>
    </>
  );
}

export default LinkController;
