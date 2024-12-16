import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";



function Header() {
  return (
    <>
      <AppBar>
        <Toolbar>
          {/* <Box component={"img"} src="./public/vite.svg" /> */}
          <Link href="/dashboard" color="inherit"  underline="none"><Typography variant="subtitle1">Dashboard</Typography></Link>
          
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: 20,
              paddingLeft: 12,
            }}
          >
            <Link href="/" color="inherit" underline="none">
              Posts
            </Link>
            <Link href="/" color="inherit" underline="none">
              Create New
            </Link>
            <Link href="/test" color="inherit" underline="none">
              Practice
            </Link>
            <Link href="/roadmap" color="inherit" underline="none">
              Road Map
            </Link>
            <Link href="/manage/Daily" color="inherit" underline="none">
              Check list
            </Link>
          </Box>
          <IconButton >
            <PersonIcon />
          </IconButton>

          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
