import React from 'react';
import { RoadMaps, Topic } from './types';
import { Button, Typography } from '@mui/material';
import { StyledTextInput } from './Styles';

interface CardHeadingProps {
  showInput: string | null;
  item: RoadMaps;
  handleTitleEdit: (topic:Topic | RoadMaps,property:string) => void;
  handleTitleChange: () => void;
  value:string;
  onChange:(arg:string)=>void
}

function CardHeading({
  showInput,
  item,
  handleTitleEdit,
  handleTitleChange,
  onChange,
  value
}: CardHeadingProps) {
  return (
    <>
      {showInput !== item.title && (
        <Button
          fullWidth
          color={item.color}
          variant="contained"
          onDoubleClick={()=>handleTitleEdit(item,"title")}
        >
          <Typography
            align="center"
            variant="subtitle1"
            fontWeight={900}
            fontSize={14}
          >
            {item.title}
          </Typography>
        </Button>
      )}
      {showInput === item.title && (
        <StyledTextInput
          value={value}
          autoFocus
          size="small"
          fullWidth
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleTitleChange}
        />
      )}
    </>
  );
}

export default CardHeading;
