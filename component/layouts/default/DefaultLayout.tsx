import { styles } from ".";

import BuilderFooterContainer from "@component/builder/footer/BuilderFooterContainer";
import BuilderHeaderContainer from "@component/builder/header/BuilderHeaderContainer";
import BuilderLoadingContainer from "@component/builder/loading/BuilderLoadingContainer";

export default ({ cssVariable, pageLoading, authenticated, displayHeader, Component, pageProps }: any) => {
  return (
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
};
