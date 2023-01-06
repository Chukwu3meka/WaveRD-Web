import Image from "next/image";

import { styles } from ".";
import { IBuilderLoading } from "@interface/builder/loading-interface";
import { Fade } from "react-awesome-reveal";

const BuilderLoading = ({ height, loading, colorScheme, component }: IBuilderLoading) => (
  <>
    <div style={{ display: loading ? "unset" : "none", border: "3px solid red" }}>
      <Fade duration={2000} style={{ height: "100%" }}>
        <main className={styles.loading} style={{ height: height || "100%" }}>
          <Image src="/images/layout/ball.png" alt="SoccerMASS Loading ball" height={50} width={50} placeholder="blur" blurDataURL="/images/layout/ball.png" />
          <div>
            {new Array(5).fill("").map((_, index) => (
              <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
            ))}
          </div>
        </main>
      </Fade>
    </div>

    <main style={{ display: loading ? "none" : "unset", border: "3px solid red" }}>
      <Fade direction="down" duration={2000}>
        {component}
      </Fade>
    </main>
  </>
);

export default BuilderLoading;
