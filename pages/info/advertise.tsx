import ComingSoon from "@component/shared/comingSoon";
import { connector, ConnectorProps } from "@store";

export default connector((props: ConnectorProps) => (
  <ComingSoon
    header={false}
    finishDate={new Date("December 8 2023")}
    //
    // minHeight="200px"
    minHeight="calc(var(--visibleScreen) - var(--headerHeight) - 70px)"
  />
));
