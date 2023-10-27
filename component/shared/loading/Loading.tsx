import { styles } from ".";

const Loading = ({ height }: any) => (
  <main className={styles.loading} style={{ height: height || "calc(var(--visibleScreen) - var(--headerHeight))" }}>
    <span />
  </main>
);

export default Loading;
