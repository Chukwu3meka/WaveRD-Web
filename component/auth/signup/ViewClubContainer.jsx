import { ViewClub } from ".";
import { useState } from "react";

const ViewClubContainer = ({ displayClub: { club, squad: propsSquad }, setDisplayClub }) => {
  const [lastSort, setLastSort] = useState("desc"),
    [squad, setSquad] = useState(propsSquad),
    clubRating = Math.round(squad.reduce((pv, cv) => pv + cv.rating, 0) / squad.length);

  const hideViewClub = () => setDisplayClub(null);

  const sortPlayers = (property) => () => {
    setLastSort(lastSort === "ascd" ? "desc" : "ascd");
    setSquad(lastSort === "ascd" ? squad.sort((x, y) => x[property] - y[property]) : squad.sort((x, y) => y[property] - x[property]));
  };

  return <ViewClub {...{ club, squad, hideViewClub, sortPlayers, clubRating }} />;
};

export default ViewClubContainer;
