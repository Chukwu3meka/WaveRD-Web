import { useEffect, useState } from "react";

import { ComingSoon } from ".";
import { arrayRotate } from "@utils/handlers";

import { IBuilderLoadingContainer } from "@interface/builder/loading-interface";

const ComingSoonContainer = ({ height }: IBuilderLoadingContainer) => {
  const [time, setTime] = useState(0);
  const [colorScheme, setColorScheme] = useState<string[]>(["#dfefdf", "#bddebd", "#9ace9a", "#78bd78", "#56ac56"]);

  useEffect(() => {
    console.log("loading");

    const timer = window.setInterval(() => {
      const movingColors: string[] = arrayRotate({ arr: colorScheme }) as string[];
      setTime((prevTime) => prevTime + 1); // <-- Change this line!
      setColorScheme(movingColors);
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return <ComingSoon {...{ height, colorScheme }} />;
};

export default ComingSoonContainer;
