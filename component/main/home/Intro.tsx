import Link from "next/link";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Intro = () => (
  <div className={styles.intro}>
    <Typography variant="caption" fontSize="1em">
      <Link href={process.env.NEXT_PUBLIC_BASE_CLIENT!}>Welcome to</Link>
    </Typography>
    <Typography variant="h1" fontSize="3em" fontWeight={900}>
      SoccerMASS
    </Typography>
    <Typography variant="body2" fontSize="1.2em">
      <Link href={process.env.NEXT_PUBLIC_BASE_MANAGER!}>The home of Soccer Managers</Link>
    </Typography>
    <Typography variant="subtitle1" fontSize="1em">
      <Link href={process.env.NEXT_PUBLIC_BASE_APIHUB!}>No. 1 Football API Provider</Link>
    </Typography>
  </div>
);

export default Intro;
