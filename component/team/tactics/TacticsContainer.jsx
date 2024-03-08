import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { styles } from ".";
import playerStore from "@source/playerStore";
import { roles } from "@source/formationStore";
import Spinner from "@component/others/Spinner";
import { fetchTacticsAction, saveTacticsAction } from "@store/actions";
import { Header, Formation, SubsTactics, Unavailable, NextMatch } from ".";
import clubStore from "@source/clubStore";
import squad from "../squad";

const matchStyleOptions = {
  mentality: ["Balanced", "Offensive", "Defensive"],
  attacking: ["Left Axis", "Middle Axis", "Right Axis"],
  tackling: ["Confident", "Hard Pressing", "Auto Swing"],
  tikitaka: ["Opponent Half", "All Over", "Own Half", "No Pressing"],
};

const TacticsContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [auth, setAuth] = useState(null),
    [players, setPlayers] = useState([]),
    [tactics, setTactics] = useState(null),
    [clubRating, setClubRating] = useState(70),
    [invalidSquad, setInvalidSquad] = useState(null),
    { fetchTacticsAction, saveTacticsAction } = props,
    [initialPlayers, setInitialPlayers] = useState([]),
    [openFormation, setOpenFormation] = useState(false),
    [unAvailablePlayers, setUnAvailablePlayers] = useState([]),
    [formation, setFormation] = useState("433A"),
    [matchStyle, setMatchStyle] = useState({
      mentality: "Balanced",
      attacking: "Middle Axis",
      tackling: "Confident",
      tikitaka: "Opponent Half",
    });

  useEffect(() => {
    if (props.auth.club && !auth) {
      setAuth(props.auth);
      fetchTacticsAction({ division: props.auth.division });
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.tactics && auth?.club) {
      setFormation(props.tactics?.formation);
      setTactics({ ...props.tactics, club: auth.club });

      if (
        props.tactics.nextMatch?.opponent &&
        props.tactics.players.filter(({ energy, suspended, injured }, i) => i <= 10 && injured && suspended && energy < 20).length >= 1
      ) {
        setInvalidSquad(
          `The following players are included in the squad for our match against ${
            clubStore(props.tactics.nextMatch.opponent).title
          }, but are not available: ${props.tactics.players
            .filter(({ energy, suspended, injured }, i) => i <= 10 && injured && suspended && energy < 20)
            .map(({ player }) => playerStore(player).name)
            .join(", ")}. Kindly click the 'SAVE' or 'AUTO' button to use the tactics  
      ${clubStore(auth.club).coach} has suggests or update tactics ASAP.
      `
        );
      }

      setInitialPlayers(props.tactics.players.map(({ player, energy }) => ({ player, energy })));

      setPlayers(
        props.tactics.players
          .filter(({ energy, suspended, injured }) => injured === false && suspended === false && energy >= 20)
          .map(({ player, energy }) => ({ player, energy }))
      );
      setUnAvailablePlayers(
        props.tactics.players
          .filter(({ energy, suspended, injured }) => injured || suspended || energy < 20)
          .map(({ player, suspended, injured }) => ({ player, suspended, injured }))
      );
      setMatchStyle({
        mentality: props.tactics.mentality,
        attacking: props.tactics.attacking,
        tackling: props.tactics.tackling,
        tikitaka: props.tactics.tikitaka,
      });
    }
  }, [props.tactics]);

  useEffect(() => {
    if (props.tactics && auth && players.length) {
      setClubRating(
        Math.floor(
          players
            .filter((x, i) => i <= 10)
            .map((x, index) => ({ index, rating: playerStore(x.player).rating, role: playerStore(x.player).roles }))
            .reduce((total, { index, rating, role }) => total + (role.includes(roles[formation][index]) ? rating : 50), 0) / 11
        )
      );
    }
  }, [players, formation]);

  useEffect(() => {
    if (props.tacticsSaved) return enqueueSnackbar(`Tactics saved successfully`, { variant: "success" });
  }, [props.tacticsSaved]);

  useEffect(() => {
    if (props.error[0] === "SAVE_TACTICS") return enqueueSnackbar(`Failed to save Tactics`, { variant: "error" });
  }, [props.error]);

  const handleMatchStyleChange = ({ target: { name, value } }) => {
    setMatchStyle({ ...matchStyle, [name]: value });
  };

  const swapPlayerHandler = (a, b) => {
    const newPlayersArray = [...players],
      aPlayer = players.find((x) => x.player === a),
      bPlayer = players.find((x) => x.player === b),
      aIndex = players.indexOf(players.find((x) => x.player === a)),
      bIndex = players.indexOf(players.find((x) => x.player === b));

    newPlayersArray[aIndex] = bPlayer;
    newPlayersArray[bIndex] = aPlayer;

    setPlayers(newPlayersArray);
  };

  const handleOpenFormation = (value) => () => setOpenFormation(value);

  const handleFormationChange = (event) => {
    setOpenFormation(false);
    setFormation(`${event.target.value}`);
  };

  const saveTactics = async () => {
    if (JSON.stringify(initialPlayers) !== JSON.stringify([...players, ...unAvailablePlayers])) {
      await saveTacticsAction({
        formation,
        ...matchStyle,
        squad: [...players.map(({ player }) => player), ...unAvailablePlayers.map(({ player }) => player)],
      });

      setInitialPlayers([...players, ...unAvailablePlayers]);
    }
  };

  const autoTactics = async () => {
    const availPlayers = Array.from(players).sort((x, y) => playerStore(y.player).rating - playerStore(x.player).rating);

    const autoPlayers = [
      ...roles[formation].map((role) => {
        const index =
          availPlayers.findIndex(({ player }) => playerStore(player).roles.includes(role)) >= 0
            ? availPlayers.findIndex(({ player }) => playerStore(player).roles.includes(role))
            : availPlayers.length - 1;
        return availPlayers.splice(index, 1)[0];
      }),
      ...availPlayers.slice(0),
    ];

    //  prevent server call when oldTactics is same with new tactics
    if (JSON.stringify(initialPlayers) !== JSON.stringify(autoPlayers)) {
      setPlayers(autoPlayers);

      await saveTacticsAction({
        formation,
        ...matchStyle,
        squad: [...autoPlayers.map(({ player }) => player), ...unAvailablePlayers.map(({ player }) => player)],
      });

      setInitialPlayers([...autoPlayers, ...unAvailablePlayers]);
    }
  };

  return tactics ? (
    <div className={styles.tactics}>
      <Header {...{ tactics, openFormation, formation, handleOpenFormation, handleFormationChange, invalidSquad }} />
      <Formation players={players} formation={formation} swapPlayerHandler={swapPlayerHandler} clubRating={clubRating} />
      <SubsTactics
        {...{ tactics, matchStyle, handleMatchStyleChange, players, swapPlayerHandler, saveTactics, matchStyleOptions, autoTactics }}
      />
      <Unavailable unAvailablePlayers={unAvailablePlayers} />

      <NextMatch nextMatch={tactics.nextMatch} />
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.profile.auth,
    tactics: state.club.tactics,
    tacticsSaved: state.club.tacticsSaved,
  }),
  mapDispatchToProps = { fetchTacticsAction, saveTacticsAction };

export default connect(mapStateToProps, mapDispatchToProps)(TacticsContainer);
