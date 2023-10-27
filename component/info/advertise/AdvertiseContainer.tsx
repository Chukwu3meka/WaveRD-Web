import { useEffect, useState } from "react";

import { connector, ConnectorProps } from "@store";
import ComingSoon from "@component/shared/comingSoon";

export default connector((props: ConnectorProps) => {
  const [minHeight, setMinHeight] = useState("calc(var(--visibleScreen) - var(--headerHeight))");

  useEffect(() => {
    // setMinHeight(props.layout.width >= 1200 ? "calc(var(--visibleScreen) - var(--headerHeight))" : "calc(var(--visibleScreen) - var(--headerHeight) - 70px)");
    setMinHeight("calc(var(--visibleScreen) - var(--headerHeight))");
  }, [props.layout.width]);

  return <ComingSoon header={false} minHeight={minHeight} />;
});
