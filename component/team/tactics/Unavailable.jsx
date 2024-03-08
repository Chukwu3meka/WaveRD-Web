import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonOff from "@mui/icons-material/PersonOff";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import LocalHospital from "@mui/icons-material/LocalHospital";

import { styles } from ".";
import playerStore from "@source/playerStore";

const SubsTactics = ({ unAvailablePlayers }) =>
  unAvailablePlayers.length ? (
    <Paper className={styles.unavailable}>
      <Typography variant="h5" color="secondary">
        Unavailable Players
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {unAvailablePlayers.map(({ player, injured, suspended }) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{injured ? <LocalHospital /> : suspended ? <PersonOff /> : <HotelIcon />}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={playerStore(player).name} secondary={injured || suspended} />
          </ListItem>
        ))}
      </List>
    </Paper>
  ) : null;

export default SubsTactics;
