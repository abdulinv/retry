import { Box, Grid2 } from "@mui/material";
import {data, Tasks} from "../../models/checklist/daily/daily";
import Header from "./Header";
import DayCard from "./DayCard";

function CheckList() {
  return (
    <Box sx={{ marginTop: "80px", width: "100vw", p: "24px" }}>
      <Header />
      <Box>
        <Grid2 container gap={2} rowGap={6} justifyContent={"space-evenly"}>
          {data.Daily.map((day:Tasks, i:number) => {
            return (
              <Grid2 key={i} size={3}>
                <DayCard day={day} />
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
}

export default CheckList;