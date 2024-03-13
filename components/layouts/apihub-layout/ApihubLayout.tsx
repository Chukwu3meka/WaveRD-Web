"use client";

import { styles } from ".";
import { ReactChildren } from "interfaces/components/shared.interface";

import HeaderContainer from "../header";
import FooterContainer from "../footer";

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
