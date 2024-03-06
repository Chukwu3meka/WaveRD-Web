"use client";

import { InfoLayout } from ".";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { InfoLayoutContainerProps } from "interfaces/components/layouts.interface";

const InfoLayoutContainer = (props: InfoLayoutContainerProps) => {
  const { children } = props,
    router = useRouter(),
    [deviceWidth, setDeviceWidth] = useState(0),
    [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setDeviceWidth(props.deviceWidth);
  }, [props.deviceWidth]);

  useEffect(() => {
    autoCompleteHandler(location.pathname);
  }, []);

  const autoCompleteHandler = (path: string) => {
    if (path) {
      router.push(path);
      setActiveRoute(path);
    }
  };

  return (
    <InfoLayout activeRoute={activeRoute} deviceWidth={deviceWidth} autoCompleteHandler={autoCompleteHandler}>
      {children}
    </InfoLayout>
  );
};

const mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InfoLayoutContainer);
