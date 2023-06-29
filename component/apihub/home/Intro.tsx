import Link from "next/link";
import Image from "next/image";
import { Grid, Typography, Button, Stack } from "@mui/material";

import { introStyles as styles } from ".";

export default () => (
  <div className={styles.networkMesh}>
    dsfdsfdsfdsfd<p>dsfdsfds</p>
    {/* <div className={styles.intro} */}
    {/* <Grid container spacing={2} alignItems="center" overflow="hidden" sx={{ maxWidth: "1200px" }}>
      <Grid item md={1}></Grid>
      <Grid item xs={12} md={7}>
        <Stack spacing={2} p={5}>
          <Typography fontSize="2em">SoccerMASS API Hub</Typography>
          <Typography fontSize=".9em" color="primary" fontWeight={700}>
            Connect with your community
          </Typography>
          <Typography fontSize="1.1em">
            Showcase your unique brand and engage with your users through a bold and easy-to-manage API. We offer Player, Club, Country, Competition, Referee
            and many more APIs coupled with our Full-text search capabilities via API calls
          </Typography>

          <Link href="/apihub/endpoints">
            <Button size="large" variant="contained" color="success">
              View Endpoints
            </Button>
          </Link>
        </Stack>
      </Grid>

      <Grid item md={3} display={{ xs: "none", sm: "none", md: "initial" }}>
        <figure className={styles.image}>
          <Image src="/images/layout/apihub-intro.png" alt="SoccerMASS API Hub" fill />
        </figure>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid> */}
  </div>
);
