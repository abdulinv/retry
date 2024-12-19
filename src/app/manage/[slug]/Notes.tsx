import React from 'react'
import { Box,Typography } from '@mui/material'

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px" }}>
        <Typography fontWeight={700} variant="h5">Notes</Typography>
        <Typography m={1} fontWeight={600} fontSize={18} color="secondary" variant="subtitle1">
          W1 and W2 for Theory and concepts learning
        </Typography>
        <Typography color="primary" variant="body1">
          W1 for revising theory and concepts taken from Revision Analyser{" "}
        </Typography>
        <Typography color="primary" variant="body1">
          W2 for revising theory and concepts taken from new skill bucket{" "}
        </Typography>
        <Typography m={1} fontWeight={600} fontSize={18} color="secondary" variant="subtitle1">
          W3 and W4 for getting experinced with new stack and Project
        </Typography>
        <Typography color="primary" variant="body1">
          W3 for getting experinced with new stack -  small project in new stack
        </Typography>
        <Typography color="primary" variant="body1">
          W4 Project to get familiarize with overall processs -  large project with many stacks
        </Typography>
      </Box>
  )
}

export default Notes