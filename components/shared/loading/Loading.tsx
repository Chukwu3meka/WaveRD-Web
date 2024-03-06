import { styles } from ".";
import { NotFoundProps } from "interfaces/components/shared.interface";

const Loading = ({ height }: NotFoundProps) => (
  <main className={styles.loading} style={{ height: height || "calc(var(--visibleScreen) - var(--headerHeight))" }}>
    <span />
  </main>
);

export default Loading;
