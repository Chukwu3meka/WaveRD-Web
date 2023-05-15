import Loading from "@component/shared/loading/Loading";
import HeaderContainer from "@component/shared/header/HeaderContainer";

export default ({ Component, pageProps, loading }: any) => (
  <main>
    <HeaderContainer position="sticky" />
    {loading ? <Loading /> : <Component {...pageProps} />}
  </main>
);
