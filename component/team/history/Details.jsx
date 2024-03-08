import Image from "next/image";
import clubStore from "@source/clubStore";
import { Paper, Button, Typography } from "@mui/material";
import { styles } from ".";

const Details = ({ history: { club, manager, budget, won, lost, tie, goalFor, goalAgainst } }) => {
  return (
    <Paper className={styles.details} elevation={2}>
      <main>
        <div>
          <Typography variant="body2" color="textSecondary">
            {clubStore(club).nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Founded ${clubStore(club).founded}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {clubStore(club).location}
          </Typography>
        </div>
        <div>
          <Typography variant="h3" color="primary">
            {budget > 0 ? `$${budget}m` : `-$${Math.abs(budget)}m`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            budget
          </Typography>
        </div>
      </main>
      <main>
        <div>
          <Typography variant="subtitle2" color="textSecondary">
            Manager
          </Typography>
          <Typography variant="body1">{manager}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" color="textSecondary">
            Head Coach
          </Typography>
          <Typography component="label" variant="body1">
            {clubStore(club).coach}
          </Typography>
        </div>
      </main>
      <main>
        <Typography variant="subtitle1" color="textSecondary" component="i">
          Arch Rivals
        </Typography>
        <div>
          {clubStore(club).rivals.map((rival) => (
            <div key={rival}>
              <Image src={`/images/club/${rival}.webp`} height={18} width={18} alt="SoccerMASS" />
              <Typography variant="body1" component="b">
                {clubStore(rival).title}
              </Typography>
            </div>
          ))}
        </div>
      </main>
      <main>
        <Paper elevation={2}>{won}w</Paper>
        <Paper elevation={2}>{tie}d</Paper>
        <Paper elevation={2}>{lost}l</Paper>
        <Paper elevation={2}>{goalFor}f</Paper>
        <Paper elevation={2}>{goalAgainst}a</Paper>
      </main>
    </Paper>
  );
};

export default Details;
