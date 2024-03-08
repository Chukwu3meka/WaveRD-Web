import Image from "next/image";
import Paper from "@mui/material/Paper";

import Slider from "@component/others/Slider";

const NewsContainer = ({ homeStyles, clubNews }) => (
  <Slider
    slides={clubNews.map(({ title, image, content }, index) => (
      <Paper className={homeStyles.news} key={index}>
        <div>
          <Image src={`/images${image}`} layout="fill" alt={title} />
        </div>
        <div>
          <h2>{title}</h2>
          <h4>{content}</h4>
        </div>
      </Paper>
    ))}
  />
);

export default NewsContainer;
