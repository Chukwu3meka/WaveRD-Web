import { useEffect, useState } from "react";

import ManagerIntro from "./Manager";
import { connector, ConnectorProps } from "@store";

export default connector((props: ConnectorProps) => {
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
    handleResize(props.layout.width);
    setDeviceWidth(props.layout.width);
  }, [props.layout.width]);

  return <ManagerIntro slidesToShow={slidesToShow} deviceWidth={deviceWidth} />;
});
