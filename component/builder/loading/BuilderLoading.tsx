import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";

import { IBuilderLoading } from "@interface/builder/loading-interface";

const BuilderLoading = ({ height, colorScheme }: IBuilderLoading) => (
  <div>
    {/* <Fade duration={2000} style={{ height: "100%" }}> */}
    <Fade duration={2000}>
      <main className={styles.loading} style={{ height: height || "clamp(500px, calc(100vh - 200px), 1200px)" }}>
        <Image src="/images/layout/ball.png" alt="SoccerMASS Loading ball" height={50} width={50} placeholder="blur" blurDataURL="/images/layout/ball.png" />
        <div>
          {new Array(5).fill("").map((_, index) => (
            <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
          ))}
        </div>
      </main>
    </Fade>
  </div>
);

export default BuilderLoading;
