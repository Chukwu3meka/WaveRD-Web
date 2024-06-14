"use client";

import { connect } from "react-redux";
import { EndpointView, NotFound } from ".";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "utils/constants";
import { RootState } from "interfaces/redux-store/store.interface";
import { EndpointContainerProps, EndpointViewProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointContainer = (props: EndpointContainerProps) => {
  const { endpoint } = props,
    [theme, setTheme] = useState(INIT_PROFILE.theme),
    [currentTab, setCurrentTab] = useState<EndpointViewProps["currentTab"]>("1");

  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: EndpointViewProps["currentTab"]) => {
    if (typeof newValue === "string") setCurrentTab(newValue);
  };

  return endpoint ? <EndpointView theme={theme} endpoint={endpoint} currentTab={currentTab} handleTabChange={handleTabChange} /> : <NotFound />;
};

const mapStateToProps = (state: RootState) => ({
    theme: state.account.profile.theme,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointContainer);
