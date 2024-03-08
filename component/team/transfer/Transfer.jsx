import { connect } from "react-redux";
import { useState, useEffect } from "react";

import { styles } from ".";
import { ViewPlayerContainer } from "@component/team/squad";
import { Header, Market, Offers, Targets, Transfers } from ".";
import { fetchRandomAgentsAction, fetchPlayerAction } from "@store/actions";

const Transfer = (props) => {
  const [auth, setAuth] = useState(null),
    [tab, setTab] = useState("market"),
    [viewPlayer, setViewPlayer] = useState(null),
    [randomAgents, setRandomAgents] = useState(null),
    { fetchRandomAgentsAction, fetchPlayerAction } = props;

  useEffect(() => {
    if (props.auth.club && !auth) {
      setAuth(props.auth);
      fetchRandomAgentsAction();
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.randomAgents && auth) setRandomAgents({ ...props.randomAgents });
  }, [props.randomAgents]);

  const viewPlayerHandler = (player) => () => {
    setViewPlayer(player);
    fetchPlayerAction({ player });
  };

  return randomAgents ? (
    <div className={styles.transfer}>
      <Header tab={tab} setTab={setTab} />
      {tab === "market" ? (
        <Market {...{ viewPlayerHandler, randomAgents, myClub: auth.club }} />
      ) : tab === "offers" ? (
        <Offers auth={auth} />
      ) : tab === "transfers" ? (
        <Transfers auth={auth} />
      ) : (
        <Targets auth={auth} viewPlayerHandler={viewPlayerHandler} fetchPlayerAction={fetchPlayerAction} />
      )}
      <ViewPlayerContainer viewPlayer={viewPlayer} setViewPlayer={setViewPlayer} />
    </div>
  ) : (
    "loading"
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    randomAgents: state.player.randomAgents,
  }),
  mapDispatchToProps = { fetchRandomAgentsAction, fetchPlayerAction };

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
