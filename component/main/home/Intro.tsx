import a from "next/link";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Intro = () => (
  <div className={styles.intro}>
    <Typography variant="caption" fontSize={{ sm: ".89em", md: "1.5em", lg: "2.5em" }}>
      <a href={process.env.NEXT_PUBLIC_BASE_CLIENT!} rel="noopener noreferrer" target="_blank">
        Welcome to
      </a>
    </Typography>
    <Typography variant="caption" fontSize={{ sm: ".89em", md: "2.7em", lg: "4em" }} fontWeight={900}>
      SoccerMASS
    </Typography>
    <Typography variant="body2" fontSize={{ sm: ".89em", md: "1.7em", lg: "1.5em" }}>
      <a href={process.env.NEXT_PUBLIC_BASE_MANAGER!} rel="noopener noreferrer" target="_blank">
        The home of Soccer Managers
      </a>
    </Typography>
    <Typography variant="subtitle1" fontSize={{ sm: ".89em", md: "1.5em", lg: "1.5em" }}>
      <a href={process.env.NEXT_PUBLIC_BASE_APIHUB!} rel="noopener noreferrer" target="_blank">
        No. 1 Football API Provider
      </a>
    </Typography>
  </div>
);

export default Intro;
