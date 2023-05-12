import { useEffect, useState } from "react";

import fetcher from "@utils/fetcher";
import { BuilderCookieNotice } from ".";
import { connector } from "@store";

export default connector((props: any) => {
  const [authenticated, setAuthenticated] = useState(false),
    [mobileDevice, setMobileDevice] = useState(true),
    [displayDialog, setDisplayDialog] = useState(true);

  useEffect(() => {
    setAuthenticated(props.auth);
    return () => {
      setAuthenticated(props.auth);
    };
  }, [props.auth]);

  useEffect(() => {
    setMobileDevice(props.layout.width < 600);
    return () => {
      setMobileDevice(props.layout.width < 600);
    };
  }, [props.layout.width]);

  const allowCookies = async () => {
    setDisplayDialog(false);
    if (authenticated) await fetcher({ method: "GET", endpoint: "/accounts/cookieConsent" }).catch((err) => {});
  };

  return <BuilderCookieNotice displayDialog={displayDialog} allowCookies={allowCookies} mobileDevice={mobileDevice} />;
});
