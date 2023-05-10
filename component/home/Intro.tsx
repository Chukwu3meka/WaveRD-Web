import { RelativeHeader } from "@component/builder/header";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

import { introStyles } from ".";

const Intro = () => (
  <Fade direction="down" triggerOnce={true}>
    <div className={introStyles.intro}>
      <RelativeHeader theme="dark" titleOnly={null} />

      <div>
        <div>
          <Typography fontSize={{ xs: "1.4em", sm: "1.89em", md: "2.7em", lg: "3.3em", xl: "4em" }}>Welcome to</Typography>

          <Typography fontSize={{ xs: "2.7em", sm: "3.89em", md: "4.0em", lg: "5em", xl: "6em" }} fontWeight={900}>
            <a href="/organization" rel="noopener noreferrer" target="_blank">
              SoccerMASS
            </a>
          </Typography>

          <Typography fontSize={{ xs: "1.1em", sm: "1.3em" }}>
            The ultimate destination for football enthusiasts and managers, designed to provide you with everything you need to stay ahead of the game.
          </Typography>

          <Typography fontSize={{ xs: "1.1em", sm: "1.3em" }} mt="10px" mb="20px">
            With our cutting-edge tools and in-depth insights, you can access real-time data. So join us today and experience the power of data-driven football
            API like never before!
          </Typography>

          <span>
            <Link href="/manager">
              <Button size="large" variant="contained">
                Soccer Manager
              </Button>
            </Link>

            <Link href="/apihub">
              <Button size="large" variant="contained">
                API Hub
              </Button>
            </Link>
          </span>
        </div>
        <div />
      </div>
    </div>
  </Fade>
);

export default Intro;
