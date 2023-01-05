import { Fragment } from "react";
import Image from "next/image";

import { styles } from ".";
import { IBuilderLoading } from "@interface/builder/loading-interface";

const BuilderLoading = ({ height, loading, colorScheme, component }: IBuilderLoading) => (
  <>
    {/* <main className={`${styles.loading} ${styles[loading ?"loading":"loading-hidden"]}`} style={{ height: height || "100%", display: loading ? "initial" : "none" }}> */}
    <main className={styles[loading ? "loading" : "loading-hidden"]} style={{ height: height || "100%" }}>
      <Image src="/images/layout/ball.png" alt="SoccerMASS Loading ball" height={50} width={50} placeholder="blur" blurDataURL="/images/layout/ball.png" />
      <div>
        {new Array(5).fill("").map((_, index) => (
          <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
        ))}
      </div>
    </main>
    <main style={{ display: loading ? "none" : "initial" }}>{component}</main>
  </>
);

export default BuilderLoading;
