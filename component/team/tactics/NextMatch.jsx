import clubStore from "@source/clubStore";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Paper, Typography } from "@mui/material";
import { styles } from ".";
import { ordinalSuffix } from "@utils/clientFuncs";

import playerStore from "@source/playerStore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonOff from "@mui/icons-material/PersonOff";
import LocalHospital from "@mui/icons-material/LocalHospital";

const NextMatch = (props) => {
  const {
    nextMatch: { home, away, opponent, competition, date, lastFiveMatches },
  } = props;

  if (lastFiveMatches) {
    return (
      <Paper className={styles.nextMatch}>
        <div>
          <div>
            <AvatarGroup>
              <Avatar alt="Home Club " src={`/images/club/${home}.webp`} style={{ background: "white" }} />
              <Avatar alt="Away Club " src={`/images/club/${away}.webp`} />
            </AvatarGroup>
            <main>
              <Typography variant="body2" color="textSecondary">
                {clubStore(opponent).stadium}
              </Typography>
              <Typography variant="h6" color="secondary">
                {clubStore(opponent).title}
              </Typography>
            </main>
          </div>
          <Typography variant="h6">{clubStore(opponent).coach}</Typography>
          <Typography variant="body2">{competition} competition</Typography>
        </div>
        <div>
          <Typography variant="body2" color="primary">
            {date.split(" ")[1]}
          </Typography>
          <Typography variant="h2">{ordinalSuffix(date.split(" ")[2])}</Typography>
          <div>
            {lastFiveMatches?.map((match, index) => (
              <span id={styles[match]} key={index} />
            ))}
          </div>
        </div>
      </Paper>
    );
  } else {
    return null;
  }
};

export default NextMatch;
