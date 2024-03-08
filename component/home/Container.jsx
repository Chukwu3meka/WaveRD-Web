import { useState } from "react";
import { fetcher } from "@utils/clientFuncs";

import { Intro, Support, SearchPlayer, Solutions, styles } from ".";

const HomeContainer = () => {
  const [playerSearchOptions, setPlayerSearchOptions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({
    clubRef: "club25",
    name: "N'Golo Kanté",
    ref: "player758",
    roles: ["DM", "CM"],
    stat: [
      { label: "club", data: "Chelsea" },
      { label: "country", data: "France" },
      { label: "age", data: "1991-05-12T23:00:00.000Z" },
      { label: "emotion", data: "Happy" },
      { label: "rating", data: 88 },
      { label: "value", data: 117.33 },
    ],
  });

  const setSearchTermHandler = async (_, searchTerm) => {
    if (searchTerm) {
      const player = await fetcher("/api/v1/getPlayerDetailsByID", JSON.stringify({ playerID: searchTerm["_id"] }));
      if (player) setPlayerDetails(player);
    }
  };

  const playerSearchInputAutoComplete = async (_, searchTerm) => {
    setSearching(true);
    const res = await fetcher("/api/v1/searchPlayerWithAutoComplete", JSON.stringify({ searchTerm }));
    setSearching(false);
    setPlayerSearchOptions(res);
  };

  return (
    <div className={styles.home}>
      <Intro />
      <Solutions />
      <SearchPlayer
        searching={searching}
        playerDetails={playerDetails}
        playerSearchInputAutoComplete={playerSearchInputAutoComplete}
        playerSearchOptions={playerSearchOptions}
        setSearchTermHandler={setSearchTermHandler}
      />
      <Support />
    </div>
  );
};

export default HomeContainer;
