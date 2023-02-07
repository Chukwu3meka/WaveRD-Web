import Link from "next/link";
import Image from "next/image";
import { Paper, Button } from "@mui/material";

import { managerIntroStyles } from ".";

const ManagerIntro = () => (
  <div className={managerIntroStyles.managerIntro}>
    <Paper elevation={2}>
      <div>
        <Image
          src="/images/layout/intro-signup.jpg"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="SoccerMASS Clubs"
        />
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
        <Image
          src="/images/layout/intro-clubs.jpg"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="SoccerMASS Clubs"
        />
      </div>
      <div>
        <Image
          src="/images/layout/intro-players.png"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="SoccerMASS Players"
        />
      </div>
    </Paper>

    <Paper elevation={2}>
      <div>
        <Image
          src="/images/layout/intro-signin.jpg"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="SoccerMASS Clubs"
        />
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