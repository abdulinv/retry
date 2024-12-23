"use client"
import { AppBar, Box, Toolbar } from '@mui/material'
import React from 'react'
import Timer from '../time/Timer'


function Footer() {

  return (
   <Box
    sx={{
        position:"fixed",
        bottom:0,
    }}
   >
   <AppBar color='info' position='relative' sx={{width:"100vw"}}>
    <Toolbar>
        <Timer/>
    </Toolbar>
   </AppBar>
   </Box>
  )
}

export default Footer