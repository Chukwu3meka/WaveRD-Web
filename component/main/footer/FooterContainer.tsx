import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Footer } from ".";
import { useEffect, useState } from "react";
// import { logoutAction } from "@store/actions";
const logoutAction = () => {};

const FooterContainer = (props: any) => {
  const { logoutAction, club, maintainance } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    setauthenticated(props.authenticated || false);
  }, [props.authenticated]);

  const logoutHandler = () => () => {
    if (club) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Footer {...{ logoutHandler, authenticated }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
