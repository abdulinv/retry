import { test } from "@/models/Test";
import { Box, Container, Typography, Paper, Button, Link } from "@mui/material";

function DashBoard() {
  return (
    <>
      <Container sx={{ width: "100vw", p: 8 }}>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {test.map((item,i) => (
            <Paper
              key={`${item.testNumber}-${i}`}
              elevation={10}
              sx={{
                p: 2,
                borderRadius: "12px",
                display: "flex",
                gap: 4,
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", gap: 4 }}>
                <Typography fontWeight={900} key={item.stack}>
                  {item.stack}
                </Typography>
                <Typography key={item.stack}>
                  Test : {item.testNumber}
                </Typography>
              </Box>

              <Box>
                <Typography>Last taken Date</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Last Score</Typography>
                <Link href={`/test/${item.testNumber}`}>
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
