"use client";
import React from "react";
import { Grid2, Typography, Button } from "@mui/material";
import StackList from "./StackList";
import { useState } from "react";
import { RoadMapProps } from "./types";
import RoadMapCard from "./RoadMapCard";
import { addDocument} from "../../../lib/fetch";

function RoadMapProvider({ RoadMaps }: RoadMapProps) {
  const [selectedStack, setSelectedStack] = useState("");
  return (
    <>
      <StackList RoadMaps={RoadMaps} setSelectedStack={setSelectedStack} />
      <Grid2
        sx={{ border: "1px solid grey", p: 2, borderRadius: "12px" }}
        size={10}
      >
        <Button
          sx={{ height: "40px", marginBottom: 4 }}
          fullWidth
          variant="contained"
          size="small"
          onClick={()=>{
            const newDoc = {
                title:"Enter title here",
                topics:["add here"],
                stack:selectedStack,
            };
            addDocument(`rm-${selectedStack}`,newDoc);
          }}
        >
          {" "}
          <Typography variant="h5">{selectedStack}</Typography>
        </Button>

        <Grid2 container gap={2} justifyContent={"space-around"}>
          {RoadMaps.filter((item) => item.doc.stack === selectedStack)?.map(
            (item, i) => (
              <Grid2 size={3} key={i}>
                <RoadMapCard item={item.doc} id={item.id} />
              </Grid2>
            )
          )}
        </Grid2>
      </Grid2>
    </>
  );
}

export default RoadMapProvider;
