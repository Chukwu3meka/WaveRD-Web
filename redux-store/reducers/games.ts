import { GamesProfile } from "interfaces/redux-store/games.interfaces";

const initState: GamesProfile = {
  world: null,
};

const gamesReducer = (state: GamesProfile = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_GAMES_PROFILE":
      return { ...data };
    default:
      return state;
  }
};

export default gamesReducer;
