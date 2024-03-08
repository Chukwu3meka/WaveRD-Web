import Image from "next/image";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import { styles, formationStyles } from ".";
import playerStore from "@source/playerStore";
import { roles } from "@source/formationStore";

const Formation = ({ players, formation, swapPlayerHandler, clubRating }) => (
  <Paper className={formationStyles.formation} elevation={2}>
    <div>{clubRating}</div>
    {players
      .filter((_, i) => i < 11)
      .map(({ player, energy }, index) => (
        <span className={formationStyles[`p${index}-${formation}`]} key={player}>
          <div className={formationStyles.playerImage}>
            <Box>
              <CircularProgress variant="determinate" value={energy} color="inherit" />
              <div>
                <span>{playerStore(player).rating}</span>
                <figure>
                  <Image src={`/images/player/${player}.webp`} layout="fill" alt="SoccerMASS" />
                  <Select
                    size="small"
                    value={player}
                    key={player}
                    onChange={({ target: { value } }) => swapPlayerHandler(player, value)}>
                    {players.map(({ player, energy }) => (
                      <MenuItem value={player} key={player}>
                        <div className={styles.playersOption}>
                          <div>
                            <CircularProgress variant="determinate" value={energy} size={25} color="inherit" />
                            <span>{playerStore(player).rating}</span>
                          </div>
                          <span />
                          <span>
                            {playerStore(player).name}
                            {playerStore(player).roles.map((role, i, a) => (
                              <span key={i}>{`${i === 0 ? "[" : " "}${role}${i === a.length - 1 ? "]" : ""}`}</span>
                            ))}
                          </span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </figure>
                <span>{roles[formation][index]}</span>
                <Typography variant="caption" component="p" color="textSecondary">
                  {playerStore(player).name}
                </Typography>
              </div>
            </Box>
          </div>
        </span>
      ))}
  </Paper>
);

export default Formation;
