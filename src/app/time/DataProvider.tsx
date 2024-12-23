"use client";
import {  Stack } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function DataProvider() {
  return (
    <Stack flexDirection={"row"} gap={4}>
     
      <Timer />
    </Stack>
  );
}

export default DataProvider;
