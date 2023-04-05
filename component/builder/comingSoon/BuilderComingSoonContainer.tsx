import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { BuilderComingSoon, styles } from ".";

import { IBuilderLoading } from "@interface/builder/loading-interface";
import { RelativeHeader } from "@component/layout/header";
import { Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { fullDateFn } from "@utils/handlers";

interface TimeLeft {
  date: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BuilderComingSoonContainer = () => {
  const finishDate: Date = new Date("June 11 2023");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ date: "", days: 0, hours: 0, minutes: 0, seconds: 0 });

  // const [pageDate, setFinishDate] = useState({
  // });

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

  return <BuilderComingSoon timeLeft={timeLeft} />;
};
export default BuilderComingSoonContainer;
