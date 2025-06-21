import React  from 'react';
import { RoadMaps, Topic } from './types';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { StyledTextInput } from './Styles';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

interface CardHeadingProps {
  showInput: string | null;
  item: RoadMaps;
  handleTitleEdit: (topic:Topic | RoadMaps,property:string) => void;
  handleTitleChange: () => void;
  value:string;
  onChange:(arg:string)=>void,
  expand:boolean;
  setExpand:()=>void
}

function CardHeading({
  showInput,
  item,
  handleTitleEdit,
  handleTitleChange,
  onChange,
  value,
  setExpand,
  expand
}: CardHeadingProps) {

  

  return (
    <Stack flexDirection={"row"}>
      {showInput !== item.title && (
        <Button
          sx={{
            borderRadius:"0px"
          }}
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
      <Box sx={{backgroundColor:"#ddd",color:"white"}} bgcolor={"primary"}>
        <IconButton onClick={()=>{
          setExpand()
        }} color='inherit'>
          {!expand?<ArrowDownward color='primary'/>:<ArrowUpward color='success'/>}
        </IconButton>
      </Box>
    
     
    </Stack>
  );
}

export default CardHeading;
