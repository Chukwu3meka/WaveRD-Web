import HeaderContainer from ".";

import { BuilderRelativeHeader } from "@interface/main/header-interface";

export default ({ theme, titleOnly }: BuilderRelativeHeader) => <HeaderContainer {...{ displayHeader: true, relativeHeader: theme, titleOnly }} />;
