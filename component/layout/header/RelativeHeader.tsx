import HeaderContainer from ".";

import { RelativeHeader } from "@interface/main/header-interface";

const RelativeHeader = ({ theme, titleOnly }: RelativeHeader) => <HeaderContainer {...{ displayHeader: true, relativeHeader: theme, titleOnly }} />;

export default RelativeHeader;
