"use client";

import { Welcome } from ".";
import { useEffect, useState } from "react";

const WelcomeContainer = () => {
  // const [showImage, setShowImage] = useState(false);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    //   setShowImage(true);
    // }, 3000);
  });

  return <Welcome showImage={showImage} />;
};

export default WelcomeContainer;
