import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { InfoLayout } from ".";

import { SubLayout } from "@interface/components/layouts/layoutsInterface";
import { connector, ConnectorProps } from "@store";

export default connector((props: SubLayout & ConnectorProps) => {
  const [activeRoute, setActiveRoute] = useState("/info"),
    { Component, pageProps, loading } = props;

  useEffect(() => {
    setActiveRoute(props.layout.route as string);
  }, [props.layout.route]);

  return <InfoLayout activeRoute={activeRoute}  Component={Component} pageProps={pageProps} loading={loading} />;
});
