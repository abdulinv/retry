"use client"

import { Button } from '@mui/material';
import { addDocument } from "../../../lib/fetch";
import React from 'react'

function AddTest({testNumber = 0}:{testNumber:number}) {
  return (
    
    <Button onClick={()=>{
        const newDoc = {
          stack:"add stack here",
          testNumber:0, 
        }
        addDocument("testList",newDoc);
        addDocument(`test-${testNumber}`,{
          qtext:"add here",
          answer:"add answer here",
          options:["option1","option2","option3","option4"],
          testName:`test-${testNumber}`,
          date:new Date().getTime().toString()
        })
      }}>+</Button>
  )
}

export default AddTest