import Image from "next/image";
import clubStore from "@source/clubStore";
import { Paper, Button, Typography } from "@mui/material";
import { styles } from ".";

import formationStore from "@source/formationStore";

const Header = ({ history: { club, trophies } }) => {
  return (
    <Paper className={styles.header} elevation={2}>
      <div>
        <figure>
          <Image src={`/images/club/${club}.webp`} layout="fill" alt="SoccerMASS" />
        </figure>

        <Typography variant="h5" component="h1">
          {clubStore(club).title}
        </Typography>
        <Typography variant="h6" component="h3">
          {clubStore(club).stadium}
        </Typography>
      </div>
      <div>
        <Typography variant="body1">Trophies</Typography>
        <div>
          <div>
            <figure>
              <Image src={`/images/layout/league.png`} layout="fill" alt="SoccerMASS" />
            </figure>
            <Typography variant="body2" color="textSecondary">
              League
            </Typography>
            <Typography variant="body1">x{trophies.league}</Typography>
          </div>
          <div>
            <figure>
              <Image src={`/images/layout/cup.png`} layout="fill" alt="SoccerMASS" />
            </figure>
            <Typography variant="body2" color="textSecondary">
              Cup
            </Typography>
            <Typography variant="body1">x{trophies.cup}</Typography>
          </div>
          <div>
            <figure>
              <Image src={`/images/layout/champLeag.png`} layout="fill" alt="SoccerMASS" />
            </figure>
            <Typography variant="body2" color="textSecondary">
              Division
            </Typography>
            <Typography variant="body1">x{trophies.division}</Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
