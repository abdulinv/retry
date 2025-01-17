import { Box, Stack } from "@mui/material";
import Header from "../Header";
import CardContainer from "./CardContainer";
import { getTasks } from "../../../../lib/fetch";
import Notes from "./Notes";

async function CheckList({ params }: { params: Promise<{ slug: string }> }) {
  const data = await getTasks();
  const slug = (await params).slug;

  return (
    <Box sx={{ marginTop: "50px", width: "100vw", p: "12px" , paddingBottom:"20px"}}>
     
     
      <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack justifyContent={"space-start"} alignItems={"center"}>
      
        {slug === "Monthly" &&  <Notes/>}
        <Header />
        </Stack>
   
      <CardContainer  data={data} />
      </Stack>
     
    </Box>
  );
}
export default CheckList;
