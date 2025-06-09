import { Paper } from "@mui/material";
import React from "react";
import DataProvider from "./DataProvider";
import { getTimeTrackInformation } from "../../../lib/fetch";


async function page() {

    const data = await getTimeTrackInformation("times");
  return (
    <Paper
      elevation={15}
      
     sx={{
      mt:10,
      height:"90vh"
     }}
    >
      <DataProvider data={data}/>
    </Paper>
  );
}

export default page;
