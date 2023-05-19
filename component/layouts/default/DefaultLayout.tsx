import Loading from "@component/shared/loading/Loading";
import HeaderContainer from "@component/shared/header/HeaderContainer";

import { SubLayout } from "@interface/components/layouts/layoutsInterface";

export default ({ Component, pageProps, loading }: SubLayout) => (
  <main>
    <HeaderContainer position="relative" />
    {loading ? <Loading /> : <Component {...pageProps} />}
  </main>
);
