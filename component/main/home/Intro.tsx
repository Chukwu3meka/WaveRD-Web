import Link from "next/link";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Intro = () => (
  <div className={styles.intro}>
    <Typography variant="caption" fontSize="1em">
      <Link href="https://www.soccermass.com/">Welcome to</Link>
    </Typography>
    <Typography variant="h1" fontSize="3em" fontWeight={900}>
      SoccerMASS
    </Typography>
    <Typography variant="body2" fontSize="1.2em">
      <Link href="https://manager.soccermass.com/">The home of Soccer Managers</Link>
    </Typography>
    <Typography variant="subtitle1" fontSize="1em">
      <Link href="https://apihub.soccermass.com/">No. 1 Football API Provider</Link>
    </Typography>
  </div>
);

export default Intro;
