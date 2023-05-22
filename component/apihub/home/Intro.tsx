import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { introStyles as styles } from ".";

export default () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <Typography color="whitesmoke">ONLINE FOOTBALL API</Typography>
      <Typography color="whitesmoke">Connect with your community</Typography>
      <Typography color="whitesmoke">Showcase your unique brand and engage with local families through a bold and easy-to-manage API.</Typography>
      <Link href="/documentation">
        <Button size="large" variant="contained" color="success">
          Start Building
        </Button>
      </Link>
    </Grid>

    <Grid item xs={0} md={4}>
      <figure className={styles.intro}>
        <Image src="/images/layout/apihub-intro.png" alt="SoccerMASS API Hub" fill />
      </figure>
    </Grid>
  </Grid>
);
