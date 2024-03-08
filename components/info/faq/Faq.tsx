"use client";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { FaqProps } from "interfaces/components/info.interfaces";
import { RootState } from "interfaces/redux-store/store.interface";

import ComingSoonContainer from "components/shared/coming-soon";

const Faq = (props: FaqProps) => {
  // const [deviceWidth, setDeviceWidth] = useState(0);

  // useEffect(() => {
  //   setDeviceWidth(props.deviceWidth);
  // }, [props.deviceWidth]);

  return <ComingSoonContainer />;
};

const mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
