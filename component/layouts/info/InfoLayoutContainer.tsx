import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { InfoLayout } from ".";
import { connector, ConnectorProps } from "@store";

import { NavLinks, SubLayout } from "@interface/components/layouts/layoutsInterface";

export default connector((props: SubLayout & ConnectorProps) => {
  const router = useRouter(),
    { Component, pageProps, loading } = props,
    [deviceWidth, setDeviceWidth] = useState(0),
    [activeRoute, setActiveRoute] = useState(props.layout.route);

  useEffect(() => {
    setActiveRoute(props.layout.route);
  }, [props.layout.route]);

  useEffect(() => {
    setDeviceWidth(props.layout.width);
  }, [props.layout.width]);

  const autoCompleteHandler = (newValue: NavLinks) => {
    if (newValue) {
      router.push(newValue.path);
      setActiveRoute(newValue.path);
    }
  };

  return (
    <InfoLayout
      loading={loading}
      Component={Component}
      pageProps={pageProps}
      activeRoute={activeRoute}
      deviceWidth={deviceWidth}
      autoCompleteHandler={autoCompleteHandler}
    />
  );
});
