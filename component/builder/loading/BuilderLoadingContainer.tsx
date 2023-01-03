import { useEffect, useState } from "react";

import { BuilderLoading } from ".";
import { arrayRotate } from "@utils/clientFuncs";
import { IBuilderLoadingContainer } from "@interface/builder/loading-interface";

const BuilderLoadingContainer = ({ height, status, component }: IBuilderLoadingContainer) => {
  const [time, setTime] = useState(0);
  const [colorScheme, setColorScheme] = useState<string[]>(["#dfefdf", "#bddebd", "#9ace9a", "#78bd78", "#56ac56"]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const movingColors: string[] = arrayRotate({ arr: colorScheme }) as string[];
      setTime((prevTime) => prevTime + 1); // <-- Change this line!
      setColorScheme(movingColors);
      if (!status) clearInterval(timer);
    }, 200);
    return () => {
      window.clearInterval(timer);
    };
  }, [time]);

  return <BuilderLoading {...{ height, status, colorScheme, component }} />;
};

export default BuilderLoadingContainer;
