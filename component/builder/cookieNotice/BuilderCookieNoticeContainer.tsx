import { useEffect, useState } from "react";

import fetcher from "@utils/fetcher";
import { BuilderCookieNotice } from ".";
import { connector } from "@store";

export default connector((props: any) => {
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
      await fetcher({ method: "GET", endpoint: "/accounts/cookieConsent" })
        .then(() => {})
        .catch((err) => {}); // ? Update record in database, that user has allowed cookies
  };

  return <BuilderCookieNotice displayDialog={displayDialog} closeDialogFn={closeDialogFn} mobileDevice={mobileDevice} />;
});
