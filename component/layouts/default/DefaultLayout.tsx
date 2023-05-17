import Loading from "@component/shared/loading/Loading";
import HeaderContainer from "@component/shared/header/HeaderContainer";

import { SubLayout } from "@interface/components/layouts/layoutsInterface";

import { styles } from ".";

export default ({ Component, pageProps, loading }: SubLayout) => (
  <main className={styles.subLayout}>
    <HeaderContainer position="sticky" />
    {loading ? <Loading /> : <Component {...pageProps} />}
  </main>
);
