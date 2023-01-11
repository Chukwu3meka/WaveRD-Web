import { styles } from ".";

import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ManagerIntro = () => (
  <div className={styles.managerIntro}>
    <Paper elevation={2}>
      <div>
        <Image src="/images/layout/fans.png" fill alt="SoccerMASS Clubs" />
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
        <Image src="/images/layout/indexClubs.png" fill alt="SoccerMASS Clubs" />
      </div>
      <Typography variant="h5">64 Clubs</Typography>
      <Typography variant="h4">1,979 Players</Typography>
      <div>
        <Image src="/images/layout/indexPlayers.png" fill alt="SoccerMASS Players" />
      </div>
    </Paper>

    <Paper elevation={2}>
      <div>
        <Image src="/images/layout/squad.png" fill alt="SoccerMASS Clubs" />
      </div>
      <span>Your Players are waiting for you, build your team, manage club finance and more </span>
      <Link href="/auth/signin">
        <Button variant="contained" color="primary">
          signin
        </Button>
      </Link>
    </Paper>
  </div>
);

export default ManagerIntro;
