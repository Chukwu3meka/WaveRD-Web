import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";

import { IBuilderLoading } from "@interface/builder/loading-interface";

const BuilderLoading = ({ height, colorScheme }: IBuilderLoading) => (
  <div>
    <Fade direction="bottom" style={{ height: "100%", minHeight: "300px" }}>
      <main className={styles.loading} style={{ height: height || "100%" }}>
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

export default BuilderLoading;
