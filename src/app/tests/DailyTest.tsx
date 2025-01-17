
"use client"
import React from 'react'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const testList = ["js","react","node","js","react","node","js"];
const testNumbers:{[key:string]:number} = {

    "js":100,
    "react":101,
    "node":102
}

function DailyTest() {

    const router = useRouter();


const handleClick = ()=>{
    const day =  new Date().getDay();
    const testName = testList[day];
    const slug = testNumbers[testName];
    router.push(`/test/${slug}`)
    
}
  return (
    <Button onClick={handleClick} variant="contained" sx={{m:4}}>Start daily test</Button>
  )
}

export default DailyTest