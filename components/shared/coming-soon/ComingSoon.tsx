"use client";

import { styles } from ".";
import { Typography, Stack } from "@mui/material";
import { ComingSoonProps } from "interfaces/components/shared.interface";

import HeaderContainer from "components/layouts/header";

export default function ComingSoon({ timeLeft, header, minHeight, title }: ComingSoonProps) {
  return (
    <main className={styles.comingSoon} style={{ minHeight }}>
      {header ? (
        <div className={styles.header}>
          <HeaderContainer position="relative" />
        </div>
      ) : null}

      <div>
        <Stack>
          <Typography color="#fff" fontSize="clamp(2em, 7vw, 4em)">
            {title} Coming soon.
          </Typography>

          <Typography color="#fff" fontSize="1em">
            {timeLeft.date}
          </Typography>
        </Stack>

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
      </div>
    </main>
  );
}
