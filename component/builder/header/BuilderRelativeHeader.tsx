import HeaderContainer from ".";

import { RelativeHeader } from "@interface/main/header-interface";

export default ({ theme, titleOnly }: RelativeHeader) => <HeaderContainer {...{ displayHeader: true, relativeHeader: theme, titleOnly }} />;
