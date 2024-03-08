import { useEffect, useState } from "react";

const Slider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slideHandler = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  };

  useEffect(() => {
    let slideTimeOut = setTimeout(slideHandler, 10000);
    return () => {
      clearTimeout(slideTimeOut);
    };
  });

  return slides[slideIndex];
};

export default Slider;
