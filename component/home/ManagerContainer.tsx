import { connect } from "react-redux";
import { useEffect, useState } from "react";

import ManagerIntro from "./Manager";

const PeaksContainer = (props: any) => {
  const [slidesToShow, setSlidesToShow] = useState(0);

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
    handleResize(props.deviceWidth);
  }, [props.deviceWidth]);

  // return <Peaks slidesToShow={slidesToShow} />;

  return <ManagerIntro slidesToShow={slidesToShow} />;
};

const mapStateToProps = (state: any) => ({ deviceWidth: state.layout.deviceWidth }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PeaksContainer);
