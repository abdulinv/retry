import { Box, Container, Typography, Paper, Button, Link } from "@mui/material";
import {  getTestList } from "../../../lib/fetch";
import AddTest from "./AddTest";
import TestInfo from "./TestInfo";

async function DashBoard() {
  const data = await getTestList("testList");
  return (
    <>
      <Container sx={{ width: "100vw", p: 8 }}>
        <AddTest/>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {data.map((item, i) => (
            <Paper
              key={`${item.doc.testNumber}-${i}`}
              elevation={10}
              sx={{
                p: 2,
                borderRadius: "12px",
                display: "flex",
                gap: 4,
                flexDirection: "column",
              }}
            >
              <TestInfo item={item}/>
              <Box>
                <Typography>Last taken Date</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Last Score</Typography>
                <Link href={`/test/${item.doc.testNumber}`}>
                  <Button variant="contained">Take Test</Button>
                </Link>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default DashBoard;