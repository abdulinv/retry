import React from 'react'
import { Box,Typography } from '@mui/material'

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px", display:"flex",  gap:4, flexDirection:"column"}}>
        <Typography fontWeight={700} variant="h5">Notes</Typography>
       
        <Typography color="primary" variant="body1">
          slot1 - connected to revision analyser
        </Typography>
        <Typography color="primary" variant="body1">
          slot2 - conenncted to revision anylyser
        </Typography>

        <Typography color="primary" variant="body1">
          slot3 - T connect to  bucket and revisin analyser
        </Typography>
        <Typography color="primary" variant="body1">
          slot4 -  connected to projects
        </Typography>

        <Typography color="primary" variant="body1">
          Daily - [ tests , ds]
        </Typography>
      </Box>
  )
}

export default Notes