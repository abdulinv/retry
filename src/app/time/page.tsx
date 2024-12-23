import { Paper } from "@mui/material";
import React from "react";
import DataProvider from "./DataProvider";


function page() {
  return (
    <Paper
      elevation={15}
      
      sx={{
        marginTop: 10,
        width:"70vw",
        height:"70vh",
        position:"absolute",
        top:"10%",
        left:"15%",
        display:"flex",
        justifyContent:"center",
      
      }}
    >
      <DataProvider/>
    </Paper>
  );
}

export default page;
