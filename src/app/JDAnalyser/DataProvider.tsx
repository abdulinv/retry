"use client";

import React from "react";
import { JobsDocs } from "./types";
import { Button, Grid2 } from "@mui/material";
import JobCard from "./JobCard";
import { addDocument } from "../../../lib/fetch";

function DataProvider({ data }: { data: JobsDocs[] }) {
  return (
    <>
      <Button sx={{ marginTop: 8, marginLeft: 10, p: 1 }} onClick={() => {
        addDocument("jobs",{
            designation:"add here",
            skills:[]
        })
      }}>+</Button>
      <Grid2 container rowGap={2} columnGap={4} sx={{ marginTop: 2, marginLeft: 10, p: 4 }}>
        {data.map((item) => {
          return (
            <Grid2 key={item.id} size={3} >
              <JobCard item={item.doc} id={item.id} />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default DataProvider;