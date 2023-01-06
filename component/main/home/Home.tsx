import { ApiHubIntro, Intro, styles, ManagerIntro } from ".";
import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NoAuthHome = () => (
  <div className={styles.noAuthHome}>
    <Intro />
    <ManagerIntro />
    <ApiHubIntro />
    <div>
      <Typography variant="caption">Welcome to</Typography>
      <Typography variant="h3" component="h1">
        SoccerMASS
      </Typography>
      <Typography variant="body2">The home of managers</Typography>
      <Typography variant="subtitle1">No. 1 Soccer Manager online</Typography>
    </div>
    <div>
      <Paper elevation={2}>
        <div>
          <Image src="/images/layout/fans.png" layout="fill" alt="SoccerMASS Clubs" />
        </div>
        <span>Signup and compete with other elite managers, take your team to the peak</span>

        <Link href="/auth/signup">
          <Button variant="contained" color="primary">
            signup
          </Button>
        </Link>
      </Paper>
      <Paper elevation={4}>
        <div>
          <Image src="/images/layout/indexClubs.png" layout="fill" alt="SoccerMASS Clubs" />
        </div>
        <Typography variant="h5">64 Clubs</Typography>
        <Typography variant="h4">1,979 Players</Typography>
        <div>
          <Image src="/images/layout/indexPlayers.png" layout="fill" alt="SoccerMASS Players" />
        </div>
      </Paper>
      <Paper elevation={2}>
        <div>
          <Image src="/images/layout/squad.png" layout="fill" alt="SoccerMASS Clubs" />
        </div>
        <span>Your Players are waiting for you, build your team, manage club finance and more </span>
        <Link href="/auth/signin">
          <Button variant="contained" color="primary">
            signin
          </Button>
        </Link>
      </Paper>
    </div>
    <div>
      <div>
        <i>●●●💗●●●</i>
        <span> No Player hoarding </span>
        <span> Competitive transfer market </span>
        <span> Advanced tactics and formation </span>
        <span> Real match simulation </span>
        <span> and many more</span>
        <i>●●●💗●●●</i>
      </div>
    </div>
    <div>
      {[
        // "bundesliga 2.png",
        "bundesliga.png",
        "serie a tim.png",
        // "calcio b.png",
        "ligue 1 conforama.png",
        // "domino's ligue 2.png",
        "premier league.png",
        // "efl championship.png",
        "laliga santander.png",
        // "laliga smartbank.png",
      ].map((league) => (
        <Image src={`/images/layout/${league}`} alt={`SoccerMASS ${league}`} width={80} height={80} key={league} />
      ))}
    </div>
  </div>
);

export default NoAuthHome;
