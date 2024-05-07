"use client";

import Slider from "react-slick";

import { styles, features } from ".";
import { Typography } from "@mui/material";
import { SlidesProp } from "interfaces/components/others/layouts.interface";

const settings = {
  speed: 5000,
  infinite: true,
  autoplay: true,
  slidesToShow: 1,
  cssEase: "linear",
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  pauseOnHover: false,
};

export default function Slides({ layout }: SlidesProp) {
  return (
    <aside className={styles.slides}>
      <div>
        <Slider {...settings}>
          {features[layout].map((slide: any) => (
            <div key={slide}>
              <Typography fontSize="1.2em" component="div">
                {slide}
              </Typography>
            </div>
          ))}
        </Slider>
      </div>
    </aside>
  );
}
