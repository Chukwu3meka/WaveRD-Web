import { Fade } from "react-awesome-reveal";

import { styles } from ".";

import HeaderContainer from "@component/shared/header";
import { Typography } from "@mui/material";
import { BuilderComingSoon } from "@interface/shared/comingSoon-interface";

const BuilderComingSoon = ({ timeLeft, header, minHeight }: BuilderComingSoon) => (
  <div className={styles.comingSoon} style={{ minHeight }}>
    {header ? <HeaderContainer theme="dark" titleOnly={null} /> : ""}

    <Fade direction="right">
      <main>
        <Typography color="#fff" fontSize="clamp(2em, 7vw, 4em)">
          Coming soon.
        </Typography>

        <Typography color="#fff" fontSize="1em" mt={-1}>
          {timeLeft.date}
        </Typography>

        <section>
          <span>
            <Typography fontSize="3em">{timeLeft.days}</Typography>
            <Typography fontSize="1em">days</Typography>
          </span>
          <span>
            <Typography fontSize="3em">{timeLeft.hours}</Typography>
            <Typography fontSize="1em">hours</Typography>
          </span>
          <span>
            <Typography fontSize="3em">{timeLeft.minutes}</Typography>
            <Typography fontSize="1em">minutes</Typography>
          </span>
          <span>
            <Typography fontSize="3em">{timeLeft.seconds}</Typography>
            <Typography fontSize="1em">seconds</Typography>
          </span>
        </section>

        <Typography color="#fff" mt={3}>
          We apologize for the inconvenience, the page you're trying to access is not available at this time. We're currently working on making some
          improvements and updates to the page, so please bear with us while we make it better. Rest assured, we're doing everything we can to get the page up
          and running as soon as possible. We appreciate your patience and understanding while we work through this process. In the meantime, feel free to
          explore other parts of our website. Thank you for your understanding and support!
        </Typography>
      </main>
    </Fade>
  </div>
);

export default BuilderComingSoon;
