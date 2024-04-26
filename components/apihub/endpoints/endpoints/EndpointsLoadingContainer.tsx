"use client";

import { EndpointsLoading } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "utils/constants";
import { RootState } from "interfaces/redux-store/store.interface";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { EndpointsLoadingContainerProps } from "interfaces/components/apihub/endpoints.interface";

const EndpointsLoadingContainer = (props: EndpointsLoadingContainerProps) => {
  const { items } = props,
    [centered, setCentered] = useState(false),
    [breakpoint, setBreakpoint] = useState<LayoutState["breakpoint"]>("xs");

  useEffect(() => {
    if (props.deviceWidth) setCentered(props.deviceWidth < BREAKPOINTS.lg);
  }, [props.deviceWidth]);

  useEffect(() => {
    if (props.breakpoint) setBreakpoint(props.breakpoint);
  }, [props.breakpoint]);

  return <EndpointsLoading items={items} centered={centered} breakpoint={breakpoint} />;
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    breakpoint: state.layout.breakpoint,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsLoadingContainer);
