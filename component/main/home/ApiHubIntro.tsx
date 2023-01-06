import { styles } from ".";

import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ApiHubIntro = () => (
  <div className={styles.noAuthHome}>
    <div>
      <div>
        <i>●●●💗●●●</i>
        <span> No Player hoarding </span>
        <span> Competitive transfer market </span>
        <span> Advanced tactics and formation </span>
        <span> Real match simulation </span>
        <span> and many more</span>
        <i>●●●💗●●●</i>
      </div>
    </div>
    <div>
      {[
        // "bundesliga 2.png",
        "bundesliga.png",
        "serie a tim.png",
        // "calcio b.png",
        "ligue 1 conforama.png",
        // "domino's ligue 2.png",
        "premier league.png",
        // "efl championship.png",
        "laliga santander.png",
        // "laliga smartbank.png",
      ].map((league) => (
        <Image src={`/images/layout/${league}`} alt={`SoccerMASS ${league}`} width={80} height={80} key={league} />
      ))}
    </div>
  </div>
);

export default ApiHubIntro;
