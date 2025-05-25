import React from 'react';
import { Box, Button } from '@mui/material';

interface ControlButtonProps {
  handleSave: () => void;
  handleClose: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
}

function ControlButton({
  handleClose,
  handleSave,
  confirmButtonText,
  cancelButtonText,
}: ControlButtonProps) {
  return (
    <Box display={'flex'} gap={4} justifyContent={'center'}>
      <Button variant="contained" color="success" onClick={handleSave}>
        {confirmButtonText}
      </Button>
      <Button color="warning" variant="outlined" onClick={handleClose}>
        {cancelButtonText}
      </Button>
    </Box>
  );
}

export default ControlButton;
