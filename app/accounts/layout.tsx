import styles from "./layout.module.scss";
import Slides from "components/shared/slides";
import FooterContainer from "components/shared/footer";
import Accounts from "components/layouts/accounts";

import { ReactChildren } from "interfaces/components/others/shared.interface";

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
