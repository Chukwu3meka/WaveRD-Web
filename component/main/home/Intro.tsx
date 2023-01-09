import a from "next/link";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Intro = () => (
  <div className={styles.intro}>
    <Typography variant="caption" fontSize=".89em">
      <a href={process.env.NEXT_PUBLIC_BASE_CLIENT!} rel="noopener noreferrer" target="_blank">
        Welcome to
      </a>
    </Typography>
    <Typography variant="h1" fontSize="2.7em" fontWeight={900}>
      SoccerMASS
    </Typography>
    <Typography variant="body2" fontSize="1.05em">
      <a href={process.env.NEXT_PUBLIC_BASE_MANAGER!} rel="noopener noreferrer" target="_blank">
        The home of Soccer Managers
      </a>
    </Typography>
    <Typography variant="subtitle1" fontSize=".89em">
      <a href={process.env.NEXT_PUBLIC_BASE_APIHUB!} rel="noopener noreferrer" target="_blank">
        No. 1 Football API Provider
      </a>
    </Typography>
  </div>
);

export default Intro;
