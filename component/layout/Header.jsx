import { styles } from "/";
import Image from "next/image";
import { Typography } from "@mui/material";

const Header = ({ displayHeader }) => (
  <div className={styles[displayHeader ? "header" : "headerHidden"]}>
    <Image src="/images/soccermass.webp" alt="SoccerMASS" width={35} height={35} />
    <Typography component="h1">SoccerMASS</Typography>
    <span />
  </div>
);

export default Header;
