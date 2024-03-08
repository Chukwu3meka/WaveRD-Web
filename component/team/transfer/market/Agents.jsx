import Image from "next/image";
import { Paper, Typography } from "@mui/material";

import { styles } from ".";
import playerStore from "@source/playerStore";
import massStore from "@source/massStore";

const Player = ({ player, viewPlayerHandler }) => (
  <Paper key={player} onClick={viewPlayerHandler(player)}>
    <div>
      <div>
        <Image src={`/images/country/${playerStore(player).country}.png`} width={15} height={10} alt="Player's country" />
        <b>{playerStore(player).rating}</b>
      </div>
      <Image src={`/images/player/${player}.webp`} width={80} height={60} alt="Player picture" />
    </div>
    <span>{playerStore(player).name}</span>
    <i>{`$${playerStore(player).value}m`}</i>
    <div>
      {playerStore(player).roles.map((role) => (
        <Paper key={role} elevation={1}>
          <span>{role}</span>
        </Paper>
      ))}
    </div>
  </Paper>
);

const Agents = ({ randomAgents: { mass, freeAgents, transferList }, viewPlayerHandler }) => {
  return (
    <Paper className={styles.agents} elevation={2}>
      <div>
        <Typography variant="body2">{`${massStore(mass)} Top Free agents`}</Typography>
        <div>
          {freeAgents?.map((player) => (
            <Player key={player} player={player} viewPlayerHandler={viewPlayerHandler} />
          ))}
        </div>
      </div>
      {transferList && transferList.length ? (
        <div style={{ marginTop: "30px" }}>
          <Typography variant="body2">{`${massStore(mass)} Transfer listed`}</Typography>
          <div>
            {transferList?.map((player) => (
              <Player key={player} player={player} viewPlayerHandler={viewPlayerHandler} />
            ))}
          </div>
        </div>
      ) : null}
    </Paper>
  );
};

export default Agents;
