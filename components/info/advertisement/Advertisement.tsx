"use client";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { AdvertisementProps } from "interfaces/components/others/info.interfaces";

import ComingSoonContainer from "components/shared/coming-soon";

const Advertisement = (props: AdvertisementProps) => {
  // const [deviceWidth, setDeviceWidth] = useState(0);

  // useEffect(() => {
  //   setDeviceWidth(props.deviceWidth);
  // }, [props.deviceWidth]);

  return <ComingSoonContainer />;
};

const mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Advertisement);
