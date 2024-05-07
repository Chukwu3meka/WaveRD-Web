"use client";

import { styles } from ".";
import { ReactChildren } from "interfaces/components/others/shared.interface";

import HeaderContainer from "../../shared/header";
import FooterContainer from "../../shared/footer";

const ApiHubLayout = ({ children }: ReactChildren) => {
  return (
    <div className={styles.layout}>
      <HeaderContainer position="relative" />
      {children}
      <FooterContainer />
    </div>
  );
};

export default ApiHubLayout;
