import { useState } from "react";

import { Welcome } from ".";

const WelcomeContainer = () => {
  const [currColor, setCurrColor] = useState(carouselColors[0]);

  const setCurrColorFn = (index: number) => setCurrColor(carouselColors[index]);

  return <Welcome {...{ setCurrColorFn, currColor, dataCovered }} />;
};

export default WelcomeContainer;

const carouselColors = ["#800080", "#1181A2", "#E0C31C", "#9191A9", "#307630"];

const dataCovered = [
  {
    title: "Player APIs",
    description:
      "Our player APIs give developers access to player-related features like profiles and game statistics. You can integrate them into your apps to create unique player experiences. Game developers can track player progress, display leaderboards, and offer personalized rewards or recommendations. Integrate these APIs for a seamless and unified experience across your games, websites, and apps.",
    path: "/apihub",
  },
  {
    title: "Club APIs",
    description:
      "Our Club API offers developers access to club-related functions like club details, team lineups, and match stats. Integrate these APIs seamlessly into your applications or websites to offer your users personalized experiences. With Club APIs, sports developers can display team rankings, match results, and player stats, keeping fans up-to-date with their favorite clubs. Create a cohesive sports experience across all your platforms with Club APIs",
    path: "/apihub",
  },
  {
    title: "Country APIs",
    description:
      "Our Country API provides comprehensive information and statistics on national teams, players, matches, and tournaments for one or multiple countries. Features include team details, recent performance stats, match schedules, injury updates, player metrics, team formations, and more.",
    path: "/apihub",
  },
  {
    title: "Competition APIs",
    description:
      "Our Soccer Competitions API provides detailed data on soccer tournaments and matches, such as schedules, results, and live scores. Developers can use this API to access team information, match statistics, and injury updates, allowing them to create engaging soccer-related applications like live score updates and fantasy games. It includes information on matches played in specific countries, including date, time, location, and score, as well as details on tournaments, such as participating teams, schedules, and results.",
    path: "/apihub",
  },
  {
    title: "Referee APIs",
    description:
      "The Referee API offers data and stats on soccer referees, including their name, nationality, age, and experience. It also provides information on their performance, such as games officiated, cards issued, penalties awarded, and other relevant metrics. The API includes referee decisions and win/loss records, giving a comprehensive overview of their performance in matches.",
    path: "/apihub",
  },
];
