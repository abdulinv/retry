import React from 'react'
import { Box,Typography } from '@mui/material'

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px", display:"flex",  gap:4, flexDirection:"column"}}>
        <Typography fontWeight={700} variant="h5">Notes</Typography>
       
        <Typography color="primary" variant="h5">
          DS-FE-DS-BE-DS-FE-DS
        </Typography>
       
      </Box>
  )
}

export default Notes