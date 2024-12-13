import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
       <Typography variant="h3">Get Started</Typography>
       <Link href={"/dashboard"}> <Button variant="contained">Go to Dahsboard</Button></Link>
       
    </div>
  );
}
