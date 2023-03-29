import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Header } from ".";
import { useEffect, useState } from "react";
import { logoutAction } from "@store/actions";

import { IHeaderContainer } from "@interface/main/header-interface";

const HeaderContainer = (props: IHeaderContainer) => {
  const { logoutAction, displayHeader, relativeHeader = null } = props,
    { enqueueSnackbar } = useSnackbar(),
    [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    setauthenticated(props.authenticated || false);
  }, [props.authenticated]);

  const logoutHandler = () => () => {
    if (authenticated) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Header {...{ logoutHandler, displayHeader, authenticated, relativeHeader }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
