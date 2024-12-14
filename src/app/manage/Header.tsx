import React from "react";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import Link from "next/link";
function Header() {
  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          m: "8px",
        }}
      >
        {["Daily", "Weekly", "Monthly"].map((item) => {
          return (
            <ListItem key={item} sx={{ width: "10%" }}>
              <ListItemButton>
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