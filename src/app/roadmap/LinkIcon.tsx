import React from 'react';
import { Stack, ListItemIcon } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface LinkIconProps {
  handleClick: () => void;
  link: string;
}

function LinkIcon({ handleClick, link }: LinkIconProps) {
  return (
    <Stack
      flexDirection={'row'}
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <ListItemIcon onClick={handleClick}>
        <InsertLinkIcon sx={{ m: 0, p: 0 }} />
      </ListItemIcon>
     
      <a href={link} target="blank">
        <ArrowOutwardIcon
          sx={{
            m: 0,
            p: 0,
            ml: -10,
            mt: 0.5,
            fontWeight:"900"
          }}
          color={link?"success":"disabled"}
          fontSize="inherit"
        />
      </a>
    </Stack>
  );
}

export default LinkIcon;