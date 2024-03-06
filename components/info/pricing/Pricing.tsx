"use client";

import ComingSoonContainer from "components/shared/coming-soon";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { PricingProps } from "interfaces/components/info.interfaces";

const Pricing = (props: PricingProps) => {
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    setDeviceWidth(props.deviceWidth);
  }, [props.deviceWidth]);

  return <ComingSoonContainer minHeight={`calc(var(--visibleScreen) - var(--headerHeight) - ${deviceWidth >= 1200 ? "0px" : "90px"})`} />;
};

const mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
