import fetcher from "@utils/fetcher";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

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

    if (auth) {
      // ? Update record that user has allowed cookies
      await fetcher({ api: "accounts", method: "PATCH", endpoint: "/personal/cookieConsent", payload: { allowedCookies: true } })
        .then(() => {})
        .catch((err) => {});
    }
  };

  return <BuilderCookieNotice displayDialog={displayDialog} closeDialogFn={closeDialogFn} />;
};

const mapStateToProps = (state: any) => ({ authStatus: state.auth.status }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuilderCookieNoticeContainer);
