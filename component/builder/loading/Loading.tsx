import Image from "next/image";
import { useEffect, useState } from "react";
import { arrayRotate } from "@utils/clientFuncs";

import styles from "./styles.module.scss";

const Loading = ({ height, status, component }: { height?: string; status: boolean; component: JSX.Element }) => {
  const [time, setTime] = useState(0);
  const [colorScheme, setColorScheme] = useState<(string | undefined)[]>(["#dfefdf", "#bddebd", "#9ace9a", "#78bd78", "#56ac56"]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const movingColors = arrayRotate({ arr: colorScheme });
      setTime((prevTime) => prevTime + 1); // <-- Change this line!
      setColorScheme(movingColors);
      if (!status) clearInterval(timer);
    }, 200);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return status ? (
    <div className={styles.loading} style={{ height: height || "100vh" }}>
      <Image src="/images/layout/ball.png" alt="SoccerMASS Advert" height={50} width={50} />
      <div>
        {new Array(5).fill("").map((i, index) => (
          <span key={index} style={{ backgroundColor: colorScheme[index] }} className={styles["loading-block"]}></span>
        ))}
      </div>
    </div>
  ) : (
    component
  );
};

export default Loading;
