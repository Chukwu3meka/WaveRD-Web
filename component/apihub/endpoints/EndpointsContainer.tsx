import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Endpoints, { styles, NavigationContainer, EndpointContainer } from ".";

export default connector((props: ConnectorProps) => {
  const [showEndpoints, setShowEndpoints] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setShowEndpoints(props.layout.width >= 620);
  }, [props.layout.width]);

  return <Endpoints showEndpoints />;
});
