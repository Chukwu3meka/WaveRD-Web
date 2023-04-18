import { connect } from "react-redux";
import { useEffect, useState } from "react";

import fetcher from "@utils/fetcher";
import { BuilderCookieNotice } from ".";

const BuilderCookieNoticeContainer = (props: any) => {
  const [auth, setAuth] = useState(false),
    [displayDialog, setDisplayDialog] = useState(true);

  useEffect(() => {
    setAuth(props.authStatus);
    return () => {
      setAuth(props.authStatus);
    };
  }, [props.authStatus]);

  const closeDialogFn = async () => {
    setDisplayDialog(false);

    if (auth)
      await fetcher({ api: "srv-accounts", method: "PATCH", endpoint: "/personal/cookieConsent", payload: { allowedCookies: true } })
        .then(() => {})
        .catch((err) => {}); // ? Update record in database, that user has allowed cookies
  };

  return <BuilderCookieNotice displayDialog={displayDialog} closeDialogFn={closeDialogFn} />;
};

const mapStateToProps = (state: any) => ({ authStatus: state.auth.status }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuilderCookieNoticeContainer);
