import Image from "next/image";
import { Paper, Typography } from "@mui/material";

import { styles } from ".";
import clubStore from "@source/clubStore";
import playerStore from "@source/playerStore";

const Review = ({
  finance: {
    club,
    squad,
    budget,
    review: { mediaCoverage, boardConfidence, fansSatisfaction, presidentsMessage },
  },
}) => {
  // console.log(review);
  // mediaCoverage: 2, boardConfidence: 'B', fansSatisfaction: 70
  return (
    <Paper className={styles.review} elevation={2}>
      <main>
        <div>
          <div>
            <figure>
              <Image src={`/images/layout/media.png`} layout="fill" alt="Media Coverage" />
            </figure>
            <Typography>{mediaCoverage}/5</Typography>
          </div>
          <Typography variant="body1">Media Coverage</Typography>
        </div>
        <div>
          <div>
            <figure>
              <Image src={`/images/layout/board.png`} layout="fill" alt="Board Confidence" />
            </figure>
            <Typography>{boardConfidence}</Typography>
          </div>
          <Typography variant="body1">Board Confidence</Typography>
        </div>
        <div>
          <div>
            <figure>
              <Image src={`/images/layout/fans.png`} layout="fill" alt="Fans Satisfaction" />
            </figure>
            <Typography>{fansSatisfaction}%</Typography>
          </div>
          <Typography variant="body1">Fans Satisfaction</Typography>
        </div>
      </main>

      <Paper elevation={2}>
        <figure>
          <Image src={`/images/layout/president.png`} layout="fill" alt="Club President" />
        </figure>
        <div>
          <Typography component="h1" variant="h6">
            President's Message
          </Typography>
          <Typography variant="body1">{presidentsMessage} </Typography>
        </div>
      </Paper>
    </Paper>
  );
};

export default Review;
