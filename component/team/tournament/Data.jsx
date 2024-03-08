import Image from "next/image";
import { useState } from "react";
import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";

import { styles, Calendar, FixtureTable, PlayerStat } from ".";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Spinner from "@component/others/Spinner";

const Data = ({ tournament, tab, competition, calPage, setCalPage }) => {
  // console.log({ tournament, tab, competition });
  // console.log(tournament[competition][tab]);

  return (
    <Paper className={styles.data}>
      <Typography sx={{ textDecoration: "underline" }} variant="button" color="green">
        {`${competition} ${tab}`}
      </Typography>{" "}
      {tab === "table" ? (
        <FixtureTable {...{ tournament, competition, tab }} />
      ) : tab === "calendar" ? (
        <Calendar {...{ tournament, competition, calPage, setCalPage }} />
      ) : ["goal", "assist", "yellow", "red"].includes(tab) ? (
        <PlayerStat {...{ tournament, competition, tab }} />
      ) : (
        <Spinner height />
      )}
    </Paper>
  );
};

export default Data;
