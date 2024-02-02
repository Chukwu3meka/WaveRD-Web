"use client";

import ManagerIntro from "./Manager";
import { useEffect, useState } from "react";
import { useStoreContext } from "components/providers/StoreProvider";

const ManagerContainer = () => {
  const { deviceSize } = useStoreContext().layout,
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
    handleResize(deviceSize.width);
  }, [deviceSize.width]);

  return <ManagerIntro slidesToShow={slidesToShow} deviceWidth={deviceSize.width} />;
};

export default ManagerContainer;
