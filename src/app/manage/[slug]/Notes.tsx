import React from "react";
import { Box, Typography } from "@mui/material";

function Notes() {
  return (
    <Box sx={{ borderRadius: "12px" }}>
      <Typography fontWeight={700} variant="h5">
        Notes - To be followed at least 6months to get results
        keep notes if facing any issues and will update after 6months
      </Typography>
      <Typography
        m={1}
        fontWeight={600}
        fontSize={18}
        color="secondary"
        variant="subtitle1"
      >
        W1 - [JavaScript,React] - PRIMARY FOCUS - 15 HOURS/MONTH MINIMUM
      </Typography>
      <Typography color="primary" variant="body1">
        W2  - [NEW CONNECT| RECONNECT ] - 15 | 30 HOURS/MONTH MINIMUM
      </Typography>
      
      <Typography color="primary" variant="body1">
        W3 [DSA | RESUME BUILD | INTERVIEW PREP | MACHINE CODE ROUND PRACTISE |OTHERS ]- 10 | 10 HOURS/MONTH
        MINIMUM
      </Typography>
      <Typography color="primary" variant="body1">
        W4 Project to get familiarize with overall processs - large project with
        many stacks - 40 HOURS/MONTH MINIMUM
      </Typography>

      <Typography color="primary" variant="body2">
        DAILY - [rev , test, ds]
      </Typography>
    </Box>
  );
}

export default Notes;
