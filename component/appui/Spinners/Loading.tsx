import Image from "next/image";

import styles from "./styles.module.scss";

const Loading = ({ height }: { height?: number }) => (
  <div className={styles.loading} style={{ height: height ? "100%" : "100vh" }}>
    <div>
      <Image src="/images/layout/ball.png" alt="SoccerMASS Advert" layout="fill" />
    </div>
  </div>
);

export default Loading;
