"use client";

import { InfoLayout } from ".";
import { useEffect, useState } from "react";
import { useStoreContext } from "components/providers/StoreContext";

import { ReactChildren } from "interfaces/components/shared.interface";
import { InfoLinks } from "interfaces/components/layouts.interface";

const InfoLayoutContainer = ({ children }: ReactChildren) => {
  const { deviceSize } = useStoreContext().layout,
    [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, []);

  const autoCompleteHandler = (newValue: InfoLinks) => {
    if (newValue) {
      // router.push(newValue.path);
      setActiveRoute(newValue.path);
    }
  };

  return (
    <InfoLayout activeRoute={activeRoute} deviceWidth={deviceSize.width} autoCompleteHandler={autoCompleteHandler}>
      {children}
    </InfoLayout>
  );
};

export default InfoLayoutContainer;
