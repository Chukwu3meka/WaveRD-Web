import BuilderFooterContainer from "@component/builder/footer/BuilderFooterContainer";
import BuilderHeaderContainer from "@component/builder/header/BuilderHeaderContainer";
import BuilderLoadingContainer from "@component/builder/loading/BuilderLoadingContainer";
import BuilderCookieNoticeContainer from "@component/builder/cookieNotice/BuilderCookieNoticeContainer";

import { styles } from ".";

export default ({ layoutProps: { cssVariable, authenticated, displayHeader, pageLoading, Component, pageProps, cookieNotice } }: any) => (
  <main className={styles.layout} style={cssVariable}>
    <BuilderHeaderContainer authenticated={authenticated} displayHeader={displayHeader} relativeHeader={null} titleOnly={null} />
    <div>
      {pageLoading && <BuilderLoadingContainer />}
      {!pageLoading && (
        <main>
          <Component {...pageProps} />
        </main>
      )}
      {!pageLoading && <BuilderFooterContainer />}
    </div>
  </main>
);
