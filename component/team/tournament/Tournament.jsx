import { styles } from ".";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Header, Competition, Data } from ".";
import Spinner from "@component/others/Spinner";
import { fetchTournamentAction } from "@store/actions";

const Tournament = (props) => {
  const [tab, setTab] = useState("table");
  const [auth, setAuth] = useState(null);
  const { fetchTournamentAction } = props;
  const [tournament, setTournament] = useState(null);
  const [competition, setCompetition] = useState("cup");

  const [calPage, setCalPage] = useState(0);

  useEffect(() => {
    if (props.auth.handle && !auth) {
      setAuth(props.auth);
      fetchTournamentAction();
      setCompetition(props.auth.division || "league");
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.auth.division && props?.tournament) {
      setTournament({ ...props.tournament, club: props.auth.club });
      // setCalPageHandler(props.tournament, props.auth.division || competition);
      setCalPageHandler(props.tournament, props.auth.division || "league", "table");
      // setCalPage(
      //   props.tournament[props.auth.division || competition].calendar.findIndex((x) => x.ag === null) === -1
      //     ? (props.tournament[props.auth.division || competition].calendar.length -
      //         process.env.TOURNAMENT_ROWS_PER_PAGE[props.auth.division || competition]) /
      //         process.env.TOURNAMENT_ROWS_PER_PAGE[props.auth.division || competition]
      //     : props.tournament[props.auth.division || competition].calendar.findIndex((x) => x.ag === null) /
      //         process.env.TOURNAMENT_ROWS_PER_PAGE[props.auth.division || competition] -
      //         1 >
      //       0
      //     ? props.tournament[props.auth.division || competition].calendar.findIndex((x) => x.ag === null) /
      //         process.env.TOURNAMENT_ROWS_PER_PAGE[props.auth.division || competition] -
      //       1
      //     : 0
      // );
    }
  }, [props.tournament]);

  const setCalPageHandler = (tournament, competition, tab) => {
    if (tab === "calendar") {
      if (tournament[competition].calendar.findIndex((x) => x.ag === null) === -1) {
        setCalPage(Math.round(tournament[competition].calendar.length / process.env.TOURNAMENT_ROWS_PER_PAGE[competition]) - 1);
      } else if (tournament[competition].calendar.findIndex((x) => x.ag === null) === 0) {
        setCalPage(0);
      } else {
        setCalPage(
          tournament[competition].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[competition] - 1
        );
      }
    }
    // const a =
    //   tournament[competition].calendar.findIndex((x) => x.ag === null) === -1
    //     ? tournament[competition].calendar.length / process.env.TOURNAMENT_ROWS_PER_PAGE[competition]
    //     : tournament[competition].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[competition] - 1 > 0
    //     ? tournament[competition].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[competition] - 1
    //     : 0;

    // return a;
  };

  const handleCompetitionChange = (id) => () => {
    // setCalPage(
    //   tournament[id].calendar.findIndex((x) => x.ag === null) === -1
    //     ? tournament[id].calendar.length - process.env.TOURNAMENT_ROWS_PER_PAGE[id]
    //     : tournament[id].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[id] - 1 > 0
    //     ? tournament[id].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[id] - 1
    //     : 0
    // );
    setCalPageHandler(tournament, id, tab);
    setCompetition(id);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setCalPageHandler(tournament, competition, newValue);
    // setCalPage(
    //   tournament[competition].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[competition] - 1 > 0
    //     ? tournament[competition].calendar.findIndex((x) => x.ag === null) / process.env.TOURNAMENT_ROWS_PER_PAGE[competition] - 1
    //     : 0
    // );
  };

  return tournament ? (
    <div className={styles.tournament}>
      <Header club={auth.club} tab={tab} handleTabChange={handleTabChange} />
      <Data tab={tab} tournament={tournament} competition={competition} calPage={calPage} setCalPage={setCalPage} />
      <Competition mass={auth.mass} division={auth.division} handleCompetitionChange={handleCompetitionChange} />
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    tournament: state.mass.tournament,
  }),
  mapDispatchToProps = { fetchTournamentAction };

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);
