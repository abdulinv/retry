import { Box } from "@mui/material";
import Header from "../Header";
import CardContainer from "./CardContainer";
import { getTasks } from "../../../../lib/fetch";
import Notes from "./Notes";

async function CheckList({ params }: { params: Promise<{ slug: string }> }) {
  const data = await getTasks();
  const slug = (await params).slug;
  console.log("slug in server component", slug);
  console.log("or", data);
  return (
    <Box sx={{ marginTop: "80px", width: "100vw", p: "24px" }}>
      <Notes/>
      <Header />
      <CardContainer data={data} />
    </Box>
  );
}
export default CheckList;
