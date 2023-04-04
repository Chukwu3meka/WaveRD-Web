import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";

import { IBuilderLoading } from "@interface/builder/loading-interface";

const ComingSoon = ({ height, colorScheme }: IBuilderLoading) => (
  <div>
    <Fade duration={2000}>
      {/* <main className={styles.loading} style={{ height: height || "clamp(500px, calc(100vh - 170px), 1200px)" }}> */}
      <main className={styles.loading} style={{ height: height || "var(--visibleScreen)" }}>
        <Image src="/images/layout/ball.png" alt="SoccerMASS Loading ball" height={60} width={60} placeholder="blur" blurDataURL="/images/layout/ball.png" />
        <div>
          {new Array(5).fill("").map((_, index) => (
            <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
          ))}
        </div>
      </main>
    </Fade>
  </div>
);

export default ComingSoon;
