import React from "react";
import { getBucketList } from "../../../lib/fetch";
import DataProvider from "./DataProvider";
import { Box } from "@mui/material";


async function page() {
  const data = await getBucketList("bucketList");
  return (
    <Box sx={{p:4}}>
        <DataProvider data={data}/>
    </Box>
    
  )
}

export default page;
