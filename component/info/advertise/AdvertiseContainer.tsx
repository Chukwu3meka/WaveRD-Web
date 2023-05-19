import { useEffect, useState } from "react";

import { connector, ConnectorProps } from "@store";
import ComingSoon from "@component/shared/comingSoon";

export default connector((props: ConnectorProps) => {
  const [minHeight, setMinHeight] = useState("calc(var(--visibleScreen) - var(--headerHeight))");

  useEffect(() => {
    setMinHeight(props.layout.width >= 1200 ? "calc(var(--visibleScreen) - var(--headerHeight))" : "calc(var(--visibleScreen) - var(--headerHeight) - 70px)");
  }, [props.layout.width]);

  return <ComingSoon header={false} finishDate={new Date("December 8 2023")} minHeight={minHeight} />;
});
