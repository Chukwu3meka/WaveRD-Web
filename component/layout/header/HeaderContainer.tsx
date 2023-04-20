import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Header } from ".";
import { useEffect, useState } from "react";
import { logoutAction } from "@store/actions";

import { HeaderContainer } from "@interface/main/header-interface";

const HeaderContainer = (props: HeaderContainer) => {
  const { logoutAction, displayHeader, relativeHeader = null, titleOnly = null } = props,
    { enqueueSnackbar } = useSnackbar(),
    [color, setColor] = useState({
      first: relativeHeader === "light" ? "#404040" : "#f1f1f1",
      last: "primary",
      social: relativeHeader === "light" ? "#404040" : "#f1f1f1",
    }),
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

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  return <Header {...{ logoutHandler, displayHeader, authenticated, relativeHeader, swapColorFn, color, titleOnly }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
