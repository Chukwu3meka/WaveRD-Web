import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { introStyles } from ".";

const Intro = () => (
  <Fade direction="down" triggerOnce={true}>
    <div className={introStyles.intro}>
      <div>
        <Typography variant="caption" fontSize={{ xs: "1.5em", sm: "1.89em", md: "1.5em", lg: "2.5em" }}>
          <a href={process.env.NEXT_PUBLIC_BASE_CLIENT!} rel="noopener noreferrer" target="_blank">
            Welcome to
          </a>
        </Typography>
        <Typography variant="caption" fontSize={{ xs: "2.8em", sm: "2.89em", md: "2.7em", lg: "4em" }} fontWeight={900}>
          SoccerMASS
        </Typography>
        <Typography variant="body2" fontSize={{ xs: "1.3em", sm: "1.5em", md: "1.7em", lg: "1.5em" }}>
          <a href={process.env.NEXT_PUBLIC_BASE_MANAGER!} rel="noopener noreferrer" target="_blank">
            The home of Soccer Managers
          </a>
        </Typography>
        <Typography variant="subtitle1" fontSize={{ xs: "1.1em", sm: "1.3em", md: "1.5em", lg: "1.5em" }}>
          <a href={process.env.NEXT_PUBLIC_BASE_APIHUB!} rel="noopener noreferrer" target="_blank">
            No. 1 Football API Provider
          </a>
        </Typography>
      </div>
    </div>
  </Fade>
);

export default Intro;
