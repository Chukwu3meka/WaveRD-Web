import { styles } from ".";

export default ({ height }: any) => (
  <main className={styles.loading} style={{ height: height || "var(--visibleScreen)" }}>
    <div className={styles.spinner}>
      <div className={styles.item}></div>
      <div className={styles.item}></div>
      <div className={styles.item}></div>
    </div>
  </main>
);
