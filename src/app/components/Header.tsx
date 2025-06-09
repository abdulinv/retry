"use client"

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";

import {

  AccessTimeRounded,

} from "@mui/icons-material";
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Header() {

  const router = useRouter();
  useEffect(()=>{
       if(!window.localStorage.getItem("access")) {
    router.push("/login")
    return;
  }
  },[]);

  return (
    <>
      <AppBar sx={{backgroundColor:"midnightblue"}}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "start",
              gap: 4,
              paddingLeft: 12,
            }}
          >
            <Link href="/tests" color="inherit" underline="none">
              Tests
          </Link>
            <Link href="/roadmap" color="inherit" underline="none">
              Road Map
            </Link>
            <Link href="/manage/Daily" color="inherit" underline="none">
              Manage
            </Link>
            <Link href="/JDAnalyser" color="inherit" underline="none">
              JD Analyser
            </Link>
            {/* <Link href="/revision" color="inherit" underline="none">
              Revision Analyser
            </Link> */}
            <Link href="/bucketlist" color="inherit" underline="none">
              BucketList
            </Link>
            <Link href="/projects" color="inherit" underline="none">
              Projects
            </Link>
          </Box>
          <Link href = "/time">
            <IconButton color="warning">
              <AccessTimeRounded />
            </IconButton>
          </Link>
          <a 
            href="https://docs.google.com/document/d/1UrI00lJnmUJCeIjH8ZIDLomoNfUc0lBJDk2ibD9pI8U/edit?usp=drive_link"
            target="blank"
            title="Tech diary"
            >
              <Box color={"white"} typography={"Tech diary"}>
              <DescriptionIcon color="inherit" />
              </Box>
              
          </a>
          <Button onClick={()=>{
            window.localStorage.removeItem("access");
            router.push("/login")
          }}>Logout</Button>
        </Toolbar>
       
      </AppBar>
    </>
  );
}

export default Header;
