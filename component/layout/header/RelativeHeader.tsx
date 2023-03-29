import HeaderContainer from ".";

import { IRelativeHeader } from "@interface/main/header-interface";

const RelativeHeader = ({ theme }: IRelativeHeader) => <HeaderContainer {...{ displayHeader: true, relativeHeader: theme }} />;

export default RelativeHeader;
