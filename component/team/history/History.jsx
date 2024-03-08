import { styles } from ".";

import clubStore from "@source/clubStore";
import Image from "next/image";
import playerStore from "@source/playerStore";
import { connect } from "react-redux";
import { fetchHistoryAction } from "@store/actions";

import { useState, useEffect } from "react";

import { Header, Details, Events, Manager, Stat } from ".";

const TacticsContainer = (props) => {
  const [history, setHistory] = useState(null);
  const [auth, setAuth] = useState(null);
  const { fetchHistoryAction } = props;

  useEffect(() => {
    if (props.auth.club && !auth) {
      setAuth(props.auth);
      fetchHistoryAction({ mass: props.auth.mass, club: props.auth.club });
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.history && auth) {
      setHistory({ ...props.history, club: auth.club });
    }
  }, [props.history]);

  return history ? (
    <div className={styles.history}>
      <Header history={history} />
      <Details history={history} />
      <Events history={history} />
      <Stat history={history} />
      <Manager history={history} />
    </div>
  ) : (
    "loading"
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    history: state.club.history,
  }),
  mapDispatchToProps = { fetchHistoryAction };

export default connect(mapStateToProps, mapDispatchToProps)(TacticsContainer);
