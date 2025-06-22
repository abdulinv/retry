"use client"
import React, { useState } from "react";
import { login } from "../../models/auth/auth";
import { Box,Button,TextField ,Typography} from "@mui/material";
import { useRouter } from "next/navigation"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      console.log("User:", result);
      if(result?.email === "althafbandiode@gmail.com" ){
            window.localStorage.setItem("access",result?.accessToken)
            navigate.push("/manage/Daily");
      }
    } catch (err) {
     
     if(err instanceof Error)
      console.error(err.message);
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleLogin}
    sx={{
      width: 300,
      margin: "200px auto",
      padding: 4,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundColor: "#fff",
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <Typography variant="h6" textAlign="center">Login</Typography>

    <TextField
      label="Email"
      variant="outlined"
      size="small"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
    />

    <TextField
      label="Password"
      variant="outlined"
      type="password"
      size="small"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
    />

    <Button variant="contained" type="submit" fullWidth>
      Login
    </Button>
  </Box>
);
}
