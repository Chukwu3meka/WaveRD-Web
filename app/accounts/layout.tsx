import type { Metadata } from "next";

import styles from "./layout.module.scss";
import Accounts from "components/layouts/accounts";
import Slides from "components/layouts/slide-text";
import { ReactChildren } from "interfaces/components/shared.interface";
import Footer from "components/layouts/footer";

export const metadata: Metadata = {
  title: "SoccerMASS: The Leading Soccer Management Solution and Football API Supplier.",
  description:
    "SoccerMASS leads the way as the top Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more.",
  keywords: ["soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <>
      <main className={styles.layout}>
        <Slides layout="accounts" />
        <Accounts>{children}</Accounts>
      </main>

      <Footer />
    </>
  );
}
