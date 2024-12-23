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
        marginTop: 10,
        width:"70vw",
        height:"70vh",
        maxHeight:"70vh",
        position:"absolute",
        top:"10%",
        left:"15%",
        display:"flex",
        justifyContent:"center",
        overflowY:"auto"
      
      }}
    >
      <DataProvider data={data}/>
    </Paper>
  );
}

export default page;
