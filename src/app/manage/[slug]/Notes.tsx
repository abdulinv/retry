import React from 'react'
import { Box,Typography } from '@mui/material'

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px" }}>
        <Typography fontWeight={700} variant="h5">Notes</Typography>
       
        <Typography color="primary" variant="body1">
          W1 - connected to revision analyser
        </Typography>
        <Typography color="primary" variant="body1">
          W2 - conenncted to revision anylyser
        </Typography>

        <Typography color="primary" variant="body1">
          W3 - T connect to  bucket and revisin analyser
        </Typography>
        <Typography color="primary" variant="body1">
          W4 -  connected to projects
        </Typography>

        <Typography color="primary" variant="body1">
          Daily - [ tests , ds]
        </Typography>
      </Box>
  )
}

export default Notes