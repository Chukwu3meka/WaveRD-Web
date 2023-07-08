import Link from "next/link";
import { Grid, Typography, Button, Stack } from "@mui/material";

import { introStyles as styles } from ".";

export default function Intro() {
  return (
    <div className={styles.intro}>
      <Grid container spacing={2} alignItems="center" overflow="hidden">
        <Grid item xs={12}>
          <Stack spacing={2} p={5}>
            <Typography fontSize="2em">SoccerMASS API Hub</Typography>
            <Typography color="primary" fontWeight={800}>
              Connect with your community
            </Typography>
            <Typography fontSize="1.2em">
              Showcase your unique brand and engage with your users through a bold and easy-to-manage API. We offer Player, Club, Country, Competition, Referee
              and many more APIs coupled with our Full-text search capabilities via API calls
            </Typography>

            <Link href="/apihub/endpoints">
              <Button size="large" variant="contained" color="success">
                Start for free
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
