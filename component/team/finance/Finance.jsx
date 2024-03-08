import { connect } from "react-redux";
import { useState, useEffect } from "react";

import { styles } from ".";
import { Header, NominalAccount, Review } from ".";
import { fetchFinanceAction } from "@store/actions";

const Finance = (props) => {
  const { fetchFinanceAction } = props,
    [auth, setAuth] = useState(null),
    [finance, setFinance] = useState(null);

  useEffect(() => {
    if (props.auth.handle && !auth) {
      setAuth(props.auth);
      fetchFinanceAction({ mass: props.auth.mass, club: props.auth.club });
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.finance && auth) {
      setFinance({ ...props.finance, club: auth.club });
    }
  }, [props.finance]);

  return finance ? (
    <div className={styles.finance}>
      <Header finance={finance} />
      <Review finance={finance} />
      <NominalAccount finance={finance} mass={auth.mass} />
    </div>
  ) : (
    "loading"
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    finance: state.club.finance,
  }),
  mapDispatchToProps = { fetchFinanceAction };

export default connect(mapStateToProps, mapDispatchToProps)(Finance);
