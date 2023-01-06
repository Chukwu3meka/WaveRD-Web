import { styles } from ".";

import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Intro = () => (
  <div className={styles.noAuthHome}>
    <Typography variant="caption">Welcome to</Typography>
    <Typography variant="h3" component="h1">
      SoccerMASS
    </Typography>
    <Typography variant="body2">The home of managers</Typography>
    <Typography variant="subtitle1">No. 1 Soccer Manager online</Typography>
  </div>
);

export default Intro;
