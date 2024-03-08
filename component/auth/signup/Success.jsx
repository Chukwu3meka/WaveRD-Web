import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";

const Success = ({ redirectHandler, mass, club, handle, email, title }) => (
  <Card>
    <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
      <CardMedia style={{ height: 50, width: 55 }} image={`/images/club/${club}.webp`} title={title} />
      <CardContent>
        <Typography variant="h5" component="h5">
          {title} contract
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Manager: {handle}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {`${title} of ${mass.sponsor} SoccerMASS, after her search for a manager has appointed ${handle} amidst other
              successful and experienced managers, as overall manager and head coach. ${handle}'s contract runs for 2 years, with an option to extend, giving ${handle} enough time to perfect the squad, as to this effect, ${handle} is expected to assume full responsibility and resume duty immediately.`}
        </Typography>

        <Typography variant="h5" color="textSecondary" align="center">
          Thank You, {handle}
        </Typography>
        <Typography variant="body1" align="center">
          A verification link from SoccerMASS has been sent to {email}. please, click on the link to activate your account. Unverified
          emails &amp; accounts are deleted automatically after 24hrs, Kindly activate your email as soon as possible.
        </Typography>

        <hr />
        <Typography variant="body2" color="textSecondary" component="p">
          By clicking the "CONTINUE" button or Verification link sent to your mail, you agree to SoccerMASS terms.
        </Typography>
        <hr />
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant="contained" size="large" color="primary" onClick={redirectHandler}>
        continue
      </Button>
    </CardActions>
  </Card>
);

export default Success;
