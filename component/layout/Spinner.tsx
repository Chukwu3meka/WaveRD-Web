import Image from "next/image";

import { spinnerStyles as styles } from ".";

const Spinner = ({ height }: { height?: number }) => (
  <div className={styles.spinner} style={{ height: height ? "100%" : "100vh" }}>
    <div>
      <Image src="/images/layout/ball.png" alt="SoccerMASS Advert" layout="fill" />
    </div>
  </div>
);

export default Spinner;
