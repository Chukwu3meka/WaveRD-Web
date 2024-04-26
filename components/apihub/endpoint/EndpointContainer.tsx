"use client";

import { EndpointView } from ".";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "utils/constants";
import { RootState } from "interfaces/redux-store/store.interface";

const EndpointContainer = (props) => {
  const { endpoint } = props,
    router = useRouter(),
    [currentTab, setCurrentTab] = useState("1"),
    [theme, setTheme] = useState(INIT_PROFILE.theme);

  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (typeof newValue === "string") setCurrentTab(newValue);
  };

  const handleClose = () => router.back();

  return (
    <EndpointView currentTab={currentTab} endpoint={endpoint} handleTabChange={handleTabChange} theme={theme} handleClose={handleClose} />
  );
};

const mapStateToProps = (state: RootState) => ({
    theme: state.layout.theme,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointContainer);
