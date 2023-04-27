import { BuilderComingSoon } from ".";

import { useEffect, useState } from "react";
import { fullDateFn } from "@utils/handlers";
import { BuilderComingSoonContainer, TimeLeft } from "@interface/builder/comingSoon-interface";

const BuilderComingSoonContainer = ({ header, minHeight = "var(--visibleScreen)" }: BuilderComingSoonContainer) => {
  const finishDate: Date = new Date("June 11 2023"),
    [timeLeft, setTimeLeft] = useState<TimeLeft>({ date: "", days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeftFn());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calcTimeLeftFn = (): TimeLeft => {
    const diffInSeconds = Math.round((finishDate.getTime() - new Date().getTime()) / 1000);

    return {
      date: fullDateFn(finishDate),
      days: Math.floor(diffInSeconds / (3600 * 24)),
      hours: Math.floor((diffInSeconds % (3600 * 24)) / 3600),
      minutes: Math.floor((diffInSeconds % 3600) / 60),
      seconds: diffInSeconds % 60,
    };
  };

  return <BuilderComingSoon timeLeft={timeLeft} header={header} minHeight={minHeight} />;
};
export default BuilderComingSoonContainer;
