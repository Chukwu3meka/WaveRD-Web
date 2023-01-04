import Image from "next/image";

import { styles } from ".";
import { IBuilderLoading } from "@interface/builder/loading-interface";

const BuilderLoading = ({ height, status, colorScheme, component }: IBuilderLoading) =>
  status ? (
    <div className={styles.loading} style={{ height: height || "100vh" }}>
      <Image
        src="/images/layout/ball.png"
        alt="SoccerMASS Loading ball"
        height={50}
        width={50}
        priority={true}
        placeholder="blur"
        blurDataURL="/images/layout/ball.png"
        quality={100}
      />
      <div>
        {new Array(5).fill("").map((_, index) => (
          <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
        ))}
      </div>
    </div>
  ) : (
    component
  );

export default BuilderLoading;
