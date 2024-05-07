"use client";

import Header from "../../shared/header";
import { Fade } from "react-awesome-reveal";

import { ReactChildren } from "interfaces/components/others/shared.interface";

const Accounts = ({ children }: ReactChildren) => {
  return (
    <div>
      <Header position="relative" />

      <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
        {children}
      </Fade>
    </div>
  );
};

export default Accounts;
