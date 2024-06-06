import Link from "next/link";
import Image from "next/image";

import { peaksStyles as styles } from ".";
import { Grid, Stack, Typography } from "@mui/material";

const Peaks = () => (
  <Stack py={5} px={1} margin="auto" maxWidth={1000} component="main" alignItems="center">
    <Stack width="100%">
      <Grid container rowSpacing={2} columnSpacing={10} direction={{ xs: "column", sm: "column", md: "row" }}>
        <Grid item xs={12} sm={7} textAlign={{ xs: "left", sm: "center", md: "left" }}>
          <Stack maxWidth={600} justifyContent="space-evenly" height="100%" m="auto">
            <Typography fontSize="1.3em">Create robust App</Typography>
            <Typography textAlign="justify" color="text.secondary" my={1}>
              If you can send an email, you can have an API connected website. Click and update content in an instant. Drag-and-drop stats, schedules,
              news, and other API wherever you want. Look like a professional webmaster without a data worries. We’ll make you look good. Select from
              dozens of stunning sports-API to begin creating a truly unique sports app for your organization.
            </Typography>
            <Link href="/apihub/endpoints">See all features</Link>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={5} pl={{ xs: 0, sm: 0, md: 2 }}>
          <figure className={styles.peakImage}>
            <Image src="/images/layout/apihub-clubs.webp" alt="ApiHub Clubs" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </figure>
        </Grid>
      </Grid>
    </Stack>

    <Stack width="100%" my={{ xs: 2, sm: 2, md: 10 }}>
      <Grid container direction={{ xs: "column", sm: "column", md: "row" }}>
        <Grid item xs={0} sm={5} pr={{ xs: 0, sm: 0, md: 2 }} display={{ xs: "none", sm: "none", md: "grid" }}>
          <figure className={styles.peakImage}>
            <Image
              src="/images/layout/apihub-players.webp"
              alt="ApiHub Players"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </figure>
        </Grid>

        <Grid item xs={12} sm={7} textAlign={{ xs: "left", sm: "center", md: "left" }}>
          <Stack maxWidth={600} justifyContent="space-evenly" height="100%" m="auto">
            <Typography fontSize="1.3em">Massive data to fetch</Typography>
            <Typography textAlign="justify" color="text.secondary" my={1}>
              Have more than one team? You’ll need more than one API. Quickly create and customize separate pages for all your squads so users can
              have fast access to schedules, news, stats, scores, and more. Improve Performance through APIs
            </Typography>
            <Link href="/apihub/endpoints">See all features</Link>
          </Stack>
        </Grid>
      </Grid>
    </Stack>

    <Stack width="100%">
      <Grid container rowSpacing={2} columnSpacing={10} direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}>
        <Grid item xs={12} sm={7} textAlign={{ xs: "left", sm: "center", md: "left" }}>
          <Stack maxWidth={600} justifyContent="space-evenly" height="100%" m="auto">
            <Typography fontSize="1.3em">Shift your focus to UI/UX</Typography>
            <Typography textAlign="justify" color="text.secondary" my={1}>
              Great first impressions lead to lasting relationships, that’s why we make it easy to put your best in app logi and UI while we focus on
              the data side of things. Quickly customize your API with players, clubs, photos, schedules, leagues, and more to make your site a place
              users love to visit over and over again.
            </Typography>
            <Link href="/apihub/endpoints">See all features</Link>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={5} pl={{ xs: 0, sm: 0, md: 2 }}>
          <figure className={styles.peakImage}>
            <Image src="/images/layout/others.png" alt="Other Peaks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </figure>
        </Grid>
      </Grid>
    </Stack>
  </Stack>
);

export default Peaks;
