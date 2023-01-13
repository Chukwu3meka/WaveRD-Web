import Carousel from "nuka-carousel";
import { Typography } from "@mui/material";

import { peaksStyles } from ".";

const Peaks = () => {
  const peaksArray = [
    "No Player hoarding in any particular team",
    "Competitive transfer market",
    "Advanced tactics and formation",
    "Real match simulation",
    "Players with rating over '89' are registered as Free agents",
  ];

  return (
    <div className={peaksStyles.transparent}>
      <div></div>
      <div>
        <Carousel autoplay={true} withoutControls={true} wrapAround={true} slidesToShow={1}>
          {peaksArray.map((peak) => (
            <div key={peak} className={peaksStyles.peak}>
              <Typography fontSize={{ xs: "1.2em", sm: "2em" }} fontWeight={600}>
                {peak}
              </Typography>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Peaks;
