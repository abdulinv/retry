import React from 'react';
import { TextStyles } from './Styles';
import { Typography } from '@mui/material';

interface TextProps {
  text: string;
  visible: boolean;
}

function Text({ text, visible }: TextProps) {
  return (
    <>
      {visible && (
        <Typography sx={TextStyles} variant="body1">
          {text}
        </Typography>
      )}
    </>
  );
}

export default Text;
