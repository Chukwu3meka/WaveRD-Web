import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { introStyles as styles } from ".";

export default () => (
  <div className={styles.intro}>
    <Grid container spacing={2} alignItems="center" overflow="hidden">
      <Grid item xs={12} md={6}>
        <Stack spacing={2} p={5}>
          <Typography fontSize="2em">SoccerMASS API Hub</Typography>
          <Typography fontSize=".9em" color="primary">
            Connect with your community
          </Typography>
          <Typography fontSize="1.1em">
            Showcase your unique brand and engage with your users through a bold and easy-to-manage API. We offer Player, Club, Country, Competition, Referee
            and many more APIs
          </Typography>

          <Link href="/apihub/documentation">
            <Button size="large" variant="contained" color="success">
              View Documentation
            </Button>
          </Link>
        </Stack>
      </Grid>

      <Grid item md={6} display={{ xs: "none", sm: "none", md: "initial" }}>
        <figure className={styles.image}>
          <Image src="/images/layout/apihub-intro.png" alt="SoccerMASS API Hub" fill />
        </figure>
      </Grid>
    </Grid>
  </div>
);
