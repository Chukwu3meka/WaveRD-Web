"use client";

import { Welcome } from ".";
import { useEffect, useState } from "react";

const WelcomeContainer = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowImage(true), 1000);
  });

  return <Welcome showImage={showImage} />;
};

export default WelcomeContainer;
