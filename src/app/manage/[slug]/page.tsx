import { Box} from "@mui/material";
import Header from "../Header";
import CardContainer from "./CardContainer";
import { getTasks } from "../../../../lib/fetch";

async function CheckList() {
   const data =  await getTasks();
   console.log("or",data);
  return (
    <Box sx={{ marginTop: "80px", width: "100vw", p: "24px" }}>
      <Header /> 
      <CardContainer data={data}/>
    </Box>
  );
}
export default CheckList;