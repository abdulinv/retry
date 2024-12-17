"use client"

import { Button } from '@mui/material';
import { addDocument } from "../../../lib/fetch";
import React from 'react'

function AddTest() {
  return (
    
    <Button onClick={()=>{
        const newDoc = {
          stack:"add stack here",
          testNumber:0, 
        }
        addDocument("testList",newDoc);
      }}>+</Button>
  )
}

export default AddTest