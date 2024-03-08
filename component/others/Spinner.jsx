import Image from "next/image";
import styles from "./spinner.module.scss";

const Spinner = ({ height }) => (
  <div className={styles.spinner} style={{ height: height ? "100%" : "100vh" }}>
    <div>
      <Image src="/images/layout/ball.png" alt="SoccerMASS Advert" layout="fill" />
    </div>
  </div>
);

export default Spinner;
