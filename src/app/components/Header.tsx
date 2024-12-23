import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

import {

  AccessTimeRounded,

} from "@mui/icons-material";

function Header() {
  return (
    <>
      <AppBar >
        <Toolbar>
          {/* <Box component={"img"} src="./public/vite.svg" /> */}
          <Link href="/tests" color="inherit" underline="none">
            <Typography sx={{ marginLeft: 5 }} variant="subtitle1">
              Tests
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-evenly",
              gap: 20,
              paddingLeft: 12,
            }}
          >
            <Link href="/roadmap" color="inherit" underline="none">
              Road Map
            </Link>
            <Link href="/manage/Daily" color="inherit" underline="none">
              Manage
            </Link>
            <Link href="/JDAnalyser" color="inherit" underline="none">
              JD Analyser
            </Link>
            <Link href="/revision" color="inherit" underline="none">
              Revision Analyser
            </Link>
            <Link href="/bucketlist" color="inherit" underline="none">
              BucketList
            </Link>
          </Box>
          <Link href = "/time">
            <IconButton color="warning">
              <AccessTimeRounded />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
