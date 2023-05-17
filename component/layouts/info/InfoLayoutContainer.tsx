import { useState, useEffect } from "react";

import { InfoLayout } from ".";
import { connector, ConnectorProps } from "@store";

import { SubLayout } from "@interface/components/layouts/layoutsInterface";

export default connector((props: SubLayout & ConnectorProps) => {
  const { Component, pageProps, loading } = props,
    [activeRoute, setActiveRoute] = useState(props.layout.route);

  useEffect(() => {
    setActiveRoute(props.layout.route);
  }, [props.layout.route]);

  useEffect(() => {
    console.log(`activeRoute updated to ${activeRoute}`);
  }, [activeRoute]);

  return <InfoLayout activeRoute={activeRoute} Component={Component} pageProps={pageProps} loading={loading} />;
});
