import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Header } from ".";
import { connector, ConnectorProps } from "@store";

import { HeaderContainer } from "@interface/main/header-interface";

const HeaderContainer = (props: HeaderContainer & ConnectorProps) => {
  const { signoutAction, displayHeader, relativeHeader = null, titleOnly } = props,
    [color, setColor] = useState({
      last: "primary",
      first: relativeHeader === "light" ? "#404040" : "#f1f1f1",
      social: relativeHeader === "light" ? "#404040" : "#f1f1f1",
    }),
    [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    setauthenticated(!!props.auth || false);
  }, [props.auth]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  return <Header {...{ signoutAction, displayHeader, authenticated, relativeHeader, swapColorFn, color, titleOnly }} />;
};

export default connector(HeaderContainer);
