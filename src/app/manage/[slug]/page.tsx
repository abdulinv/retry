import { Box} from "@mui/material";
import Header from "../Header";
import CardContainer from "./CardContainer";

function CheckList() {
   
  return (
    <Box sx={{ marginTop: "80px", width: "100vw", p: "24px" }}>
      <Header />
      <CardContainer/>
    </Box>
  );
}
export default CheckList;