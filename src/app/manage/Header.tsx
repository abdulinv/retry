import React from "react";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";
function Header() {
  return (
    <Box sx={{m:"auto" ,textAlign:"center", ml:"72px"}}>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap:4,
          m: "12px",
        }}
      >
        {["Daily", "Monthly"].map((item) => {
          return (
            <ListItem key={item} sx={{ width: "10%" }}>
              <ListItemButton >
                <Link href={`/manage/${item}`}>{item}</Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Header;