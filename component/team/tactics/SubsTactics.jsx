import { styles } from ".";
import Image from "next/image";
import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";

const SubsTactics = ({
  players,
  matchStyle,
  saveTactics,
  autoTactics,
  swapPlayerHandler,
  matchStyleOptions,
  tactics: { club },
  handleMatchStyleChange,
}) => (
  <Paper className={styles.subsTactics}>
    <div>
      <div>
        <div>
          <figure>
            <Image src={`/images/club/${club}.webp`} layout="fill" alt="SoccerMASS" />
          </figure>
          <div>
            <Typography variant="h6" color="primary">
              {clubStore(club).coach}
            </Typography>
            <Typography variant="body2" color="colorSecondary" component="span">
              coach
            </Typography>
          </div>
        </div>
        <main>
          {["tackling", "attacking", "tikitaka", "mentality"]?.map((xyz) => (
            <Box sx={{ minWidth: 170, margin: "10px auto" }} key={xyz}>
              <FormControl fullWidth size="small">
                <InputLabel>{xyz}</InputLabel>
                <Select value={matchStyle[xyz]} label={xyz} name={xyz} onChange={handleMatchStyleChange}>
                  {matchStyleOptions[xyz].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </main>
      </div>
      <div>
        <Typography variant="h5">Subs</Typography>
        {players
          .filter((_, i) => i > 11 && i < 19)
          .map(({ player }) => (
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
          ))}
      </div>
    </div>
    <ButtonGroup variant="contained" fullWidth>
      <Button onClick={autoTactics}>Auto Tactics</Button>
      <Button onClick={saveTactics}>Save Tactics</Button>
    </ButtonGroup>
  </Paper>
);

export default SubsTactics;
