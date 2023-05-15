import Loading from "@component/shared/loading/Loading";
import HeaderContainer from "@component/shared/header/HeaderContainer";

import { SubLayout } from "@interface/components/layoutsInterface";

export default ({ Component, pageProps, loading }: SubLayout) => (
  <main>
    <HeaderContainer position="sticky" />
    {loading ? <Loading /> : <Component {...pageProps} />}
  </main>
);
