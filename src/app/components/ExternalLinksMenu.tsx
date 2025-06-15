import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";

function ExternalLinksMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const externalLinks = [
    {
      label: "Tech Diary",
      href: "https://docs.google.com/document/d/1UrI00lJnmUJCeIjH8ZIDLomoNfUc0lBJDk2ibD9pI8U/edit?usp=drive_link",
    },
    {
      label: "Interview Experinces",
      href: "https://docs.google.com/document/d/1rtLkj6tK6mGJGMek1OFw6j4OBItYflFBuA4hzjr3btA/edit?usp=drive_link",
    },
    {
        label:"Resume-2025",
        href: "https://docs.google.com/document/d/1nFi3gudRKTpFG9tTiVr7MgeQYdFq6qfck8PstrS3ll0/edit?usp=drive_link"
    }
  ];

  return (
    <>
      <Button onClick={handleMenuClick} sx={{ color: "white" }}>
        External
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: 220 } }}
      >
        {externalLinks.map(({ label, href }) => (
          <MenuItem
            key={label}
            component="a"
            href={href}
            target="_blank"
            onClick={handleMenuClose}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ExternalLinksMenu;
