"use client";

import ManagerIntro from "./Manager";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { ManagerContainerProps } from "interfaces/components/others/home.interfaces";

const ManagerContainer = (props: ManagerContainerProps) => {
  const [deviceWidth, setDeviceWidth] = useState(0),
    [slidesToShow, setSlidesToShow] = useState(0);

  const handleResize = (width: number) => {
    if (width <= 420) {
      setSlidesToShow(2);
    } else if (width <= 560) {
      setSlidesToShow(3);
    } else if (width <= 720) {
      setSlidesToShow(4);
    } else if (width <= 1020) {
      setSlidesToShow(5);
    } else {
      setSlidesToShow(6);
    }
  };

  useEffect(() => {
    handleResize(props.deviceWidth!);
    setDeviceWidth(props.deviceWidth!);
  }, [props.deviceWidth]);

  return <ManagerIntro slidesToShow={slidesToShow} deviceWidth={deviceWidth} />;
};

const mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerContainer);
