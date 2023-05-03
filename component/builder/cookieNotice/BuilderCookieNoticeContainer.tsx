import { connect } from "react-redux";
import { useEffect, useState } from "react";

import fetcher from "@utils/fetcher";
import { BuilderCookieNotice } from ".";

const BuilderCookieNoticeContainer = (props: any) => {
  const [auth, setAuth] = useState(false),
    [mobileDevice, setMobileDevice] = useState(true),
    [displayDialog, setDisplayDialog] = useState(true);

  useEffect(() => {
    setAuth(props.authStatus);
    return () => {
      setAuth(props.authStatus);
    };
  }, [props.authStatus]);

  useEffect(() => {
    setMobileDevice(props.deviceWidth < 600);
    return () => {
      setMobileDevice(props.deviceWidth < 600);
    };
  }, [props.deviceWidth]);

  const closeDialogFn = async () => {
    setDisplayDialog(false);

    if (auth)
      await fetcher({ api: "srv-accounts", method: "GET", endpoint: "/cookieConsent" })
        .then(() => {})
        .catch((err) => {}); // ? Update record in database, that user has allowed cookies
  };

  return <BuilderCookieNotice displayDialog={displayDialog} closeDialogFn={closeDialogFn} mobileDevice={mobileDevice} />;
};

const mapStateToProps = (state: any) => ({
    authStatus: state.auth.status,
    deviceWidth: state.layout.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuilderCookieNoticeContainer);
