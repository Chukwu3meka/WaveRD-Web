import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Header } from ".";
import { useEffect, useState } from "react";
import { logoutAction } from "@store/actions";

import { IHeaderContainer } from "@interface/main/header-interface";

const HeaderContainer = (props: IHeaderContainer) => {
  const { logoutAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [displayHeader, setDisplayHeader] = useState(true),
    [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    setauthenticated(props.authenticated || false);
  }, [props.authenticated]);

  const handleScroll = (e) => {
    if (e.target.scrollTop > lastScrollPos) {
      setDisplayHeader(false);
    } else {
      setDisplayHeader(true);
    }
    setLastScrollPos(e.target.scrollTop);
  };

  const logoutHandler = () => () => {
    if (authenticated) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Header {...{ logoutHandler, authenticated }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
