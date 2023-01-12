import Carousel from "nuka-carousel";
import { Typography } from "@mui/material";

import { transparentStyles } from ".";

const Transparent = () => {
  const peaks = [
    "No Player hoarding in any particular team",
    "Competitive transfer market",
    "Advanced tactics and formation",
    "Real match simulation",
    "Players with rating over '89' are registered as Free agents",
  ];
  return (
    <div className={transparentStyles.transparent}>
      <div></div>
      <div>
        <Carousel autoplay={true} withoutControls={true} wrapAround={true} slidesToShow={1}>
          {peaks.map((peak) => (
            <div key={peak} className={transparentStyles.peak}>
              <Typography fontSize="2em" fontWeight={600}>
                {peak}
              </Typography>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Transparent;
