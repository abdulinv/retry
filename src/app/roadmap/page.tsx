import { Grid2 } from "@mui/material";
import RoadMapProvider from "./RoadMapProvider";
import { getRoadMaps } from "../../../lib/fetch";

async function RoadMap() {
  const data = await getRoadMaps();
  return (
    <>
      <Grid2
        container
        sx={{
          marginTop: "100px",
          width: "98vw",
          borderRadius: "12px",
          p: "6px",
          paddingBottom:"80px"
        }}
      >
        <RoadMapProvider RoadMaps={data}/>
      </Grid2>
    </>
  );
}

export default RoadMap;
