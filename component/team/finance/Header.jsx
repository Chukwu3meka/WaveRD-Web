import Image from "next/image";
import { Paper, Typography } from "@mui/material";

import { styles } from ".";
import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";

const Header = ({ finance: { club, squad, budget } }) => {
  return (
    <Paper className={styles.header} elevation={2}>
      <figure>
        <Image src={`/images/club/${club}.webp`} layout="fill" alt={club} />
      </figure>
      <Typography component="h1" variant="h5">
        {clubStore(club).title}
      </Typography>
      <Typography component="h2" variant="h6">
        {`Financial report for ${new Date().toDateString()}`}
      </Typography>
      <main>
        <div>
          <Typography variant="body2" component="p">
            Transfer Budget
          </Typography>
          <span> {budget > 0 ? `$${budget}m` : `-$${Math.abs(budget)}m`}</span>
        </div>
        <div>
          <Typography variant="body2" component="p">
            Max transfer Budget
          </Typography>
          <span>$500m</span>
        </div>
        <div>
          <Typography variant="body2" component="p">
            Club Wage
          </Typography>
          <span>${Math.round(squad.reduce((x, y) => x + (10 / 100) * playerStore(y).value, 0))}m</span>
        </div>
        <div>
          <Typography variant="body2" component="p">
            Salary Cap
          </Typography>
          <span>$260m</span>
        </div>
        <i>10% of a Player value is his wage</i>
      </main>
    </Paper>
  );
};

export default Header;
