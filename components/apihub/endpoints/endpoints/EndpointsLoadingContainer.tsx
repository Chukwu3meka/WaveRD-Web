"use client";

import { EndpointsLoading } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { EndpointsLoadingContainerProps } from "interfaces/components/apihub.interface";

const EndpointsLoadingContainer = (props: EndpointsLoadingContainerProps) => {
  const { items } = props,
    [centered, setCentered] = useState(false);

  useEffect(() => {
    if (props.deviceWidth) setCentered(props.deviceWidth < 1200);
  }, [props.deviceWidth]);

  return <EndpointsLoading items={items} centered={centered} />;
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsLoadingContainer);
