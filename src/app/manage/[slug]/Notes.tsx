import React from "react";
import { Box, Typography } from "@mui/material";

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px" }}>
      <Typography fontWeight={700} variant="h5">
        Notes
      </Typography>
      <Typography
        m={1}
        fontWeight={600}
        fontSize={18}
        color="secondary"
        variant="subtitle1"
      >
        W1 - [JavaScript,React] - PRIMARY FOCUS - 30 HOURS/MONTH MINIMUM
      </Typography>
      <Typography color="primary" variant="body1">
        W2  - [NEW CONNECT| RECONNECT ] - 20 | 20 HOURS/MONTH MINIMUM
      </Typography>
      <Typography color="primary" variant="body2">
        After 
      </Typography>
      <Typography color="primary" variant="body1">
        W3 [DSA | RESUME BUILD | INTERVIEW PREP | OTHERS ]- 10 | 10 HOURS/MONTH
        MINIMUM
      </Typography>
      <Typography color="primary" variant="body1">
        W4 Project to get familiarize with overall processs - large project with
        many stacks - 30 HOURS/MONTH MINIMUM
      </Typography>
    </Box>
  );
}

export default Notes;
