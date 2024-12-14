import { Box, Grid2 } from "@mui/material";
import { data } from "../../../models/checklist/daily/daily";
import Header from "../Header";
import DayCard from "../DayCard";
import CardContainer from "./CardContainer";

function CheckList(params:any) {
   
  return (
    <Box sx={{ marginTop: "80px", width: "100vw", p: "24px" }}>
      <Header />
      <CardContainer/>
    </Box>
  );
}
export default CheckList;