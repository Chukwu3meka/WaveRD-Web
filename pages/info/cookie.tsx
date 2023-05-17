import { Card, CardContent, Typography } from "@mui/material";

export default () => (
  <Card sx={{ maxWidth: 1200, width: "calc(100% - 20px)", mx: "auto", my: 2 }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Cookie Policy
      </Typography>
      <Typography variant="body2" color="text.secondary">
        SoccerMASS uses cookies on its website to provide you with a better user experience. Cookies are small files that are stored on your computer's hard
        drive when you visit a website. They are used to collect information about your browsing habits and to remember your preferences.
      </Typography>

      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        SoccerMASS uses cookies for the following purposes:
      </Typography>

      <Typography variant="body2" color="text.secondary">
        - To remember your login information so that you do not have to enter it every time you visit the website.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        - To track your progress through the website so that you can easily find your way back to where you left off.{" "}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        - To remember your preferences, such as your preferred language and font size.{" "}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        - To collect anonymous data about how you use the website so that SoccerMASS can improve its services.{" "}
      </Typography>

      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        Changes to Cookie Policy
      </Typography>

      <Typography variant="body2" color="text.secondary">
        SoccerMASS may change its cookie policy from time to time. Any changes will be posted on this page.
      </Typography>

      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        Social Provider
      </Typography>

      <Typography variant="body2" color="text.secondary">
        SoccerMASS uses social providers such as Facebook, Twitter, and Google to provide you with a better user experience. When you sign in to SoccerMASS
        using a social provider, we will collect your email address from that provider. We will use this email address to verify your identity and to create an
        account for you on SoccerMASS. We will not share your email address with any third parties.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        You can choose to not sign in to SoccerMASS using a social provider. If you do, you will need to create an account using your email address and
        password.
      </Typography>
    </CardContent>
  </Card>
);
