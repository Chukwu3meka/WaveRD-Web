import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Fair",
  4: "Great",
  5: "Excellent",
};

const Description = ({ activeTab, handleTabChange, ratingHover, setRatingHover, endpoint: { title, description, latency, rating } }) => (
  <div hidden={activeTab !== 0} className={styles.description}>
    <Typography variant="h5" color="text.secondary">
      {`API Overview: ${title}`}
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography fontSize={17} mr={4}>
        {`${latency} Latency`}
      </Typography>

      <Rating
        size="small"
        name="hover-feedback"
        value={rating}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        onChangeActive={(event, newHover) => {
          setRatingHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 1.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Typography fontSize={14} ml={1}>
          {labels[ratingHover !== -1 ? ratingHover : rating]}
        </Typography>
      )}
    </Box>

    <Divider variant="inset" />

    <Typography variant="body1" py={2} dangerouslySetInnerHTML={{ __html: description }} />

    <Button color="secondary" variant="outlined" onClick={() => handleTabChange(1)}>
      View API Implementation
    </Button>
  </div>
);

export default Description;
