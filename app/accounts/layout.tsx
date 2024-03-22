import styles from "./layout.module.scss";
import Slides from "components/layouts/slide-text";
import FooterContainer from "components/layouts/footer";
import Accounts from "components/layouts/accounts-layout";

import { ReactChildren } from "interfaces/components/shared.interface";

const AccountsLayout = ({ children }: ReactChildren) => (
  <>
    <main className={styles.layout}>
      <Slides layout="accounts" />
      <Accounts>{children}</Accounts>
    </main>

    <FooterContainer />
  </>
);

export default AccountsLayout;
