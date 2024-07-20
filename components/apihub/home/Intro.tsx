import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";

import { introStyles as styles } from ".";
import { Grid, Typography, Button, Stack } from "@mui/material";

const Intro = () => (
  <div className={styles.intro}>
    <Grid container spacing={2} alignItems="center" overflow="hidden">
      <Grid item xs={12}>
        <Stack spacing={2} px={3} py={4} alignItems="center">
          <Ellipsis lines={1} fontSize="2em" color="primary">
            Wave Research API Hub
          </Ellipsis>

          <Typography fontSize="1.2em" maxWidth={710} textAlign="justify" sx={{ textAlignLast: "center" }}>
            Connect with your community and showcase your unique brand and engage with your users through a bold and easy-to-manage API. We offer APIs
            that provide various information in relation to players, clubs, countries, competitions, referees and many more APIs, just name it...
            coupled with our Full-text search capabilities the first in many.
          </Typography>

          <Link href="/apihub/endpoints">
            <Button size="large" variant="contained" color="success" sx={{ fontWeight: "600" }}>
              Start for free
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  </div>
);

export default Intro;
