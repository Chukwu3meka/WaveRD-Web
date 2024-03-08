import { Card, CardMedia, Typography, CardContent, CardActionArea, Button } from "@mui/material";

const Privacy = () => (
  <Card sx={{ maxWidth: 1200, width: "calc(100% - 20px)", mx: "auto", my: 2, textAlign: "center" }}>
    <CardActionArea>
      <CardMedia component="img" height="180" image="/images/layout/privacy.png" alt="SoccerMASS Privacy page" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          AlienForest operates https://www.soccermass.com. This page informs you of our policies regarding the collection, use and disclosure of Personal
          Information we receive from users of the Site. We use your Personal Information only for the functionality of this site. By using the site, you agree
          to the collection and use information in accordance with this policy. INFORMATION COLLECTION AND USE While using our Site, we may ask you to provide
          us with certain personally identifiable information that can be used to contact or identify you. Personally, identifiable information may include, but
          is not limited to your name which we don’t ask for but your handle(username) as a way of reference to a particular manager.
        </Typography>

        <Button size="large" color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          DATA COLLECTION
        </Button>

        <Typography variant="body2" color="text.secondary">
          Some common personally identifiable information we collect and what we do with the data we receive: • Handle/Nickname: A way for other managers and
          SoccerMASS to identify you instead of collection real names; we prefer to use a nickname to protect privacy of every manager and avoid situation where
          a social media look up is carried out on a particular profile. • For sake of Privacy we do not ask for Birthdate or Gender. • Email &amp; Password: It
          is proprietary that every account has a way to authenticate with our server, there’s no better way to accomplish this without the traditional
          email/password unique way to identify/authorize and authenticate viewers. • Gender: We'll never ask for your gender neither will it be revealed to any
          user since we don't have it. We also carry out statistics with SoccerMASS. LOG DATA Like many site operators, we do not collect information that your
          browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP")
          address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages and other
          statistics. In addition, we may use third party services such as Google Analytics and Google Ads and Amazon Ads etc. that may collect, monitor and
          analyze this log. The Log Data section is for businesses that use analytics or tracking services in websites or apps, like Google Analytics.
          COMMUNICATIONS We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that you
          might need.
        </Typography>

        <Button size="large" color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          COOKIES/LOCAL STORAGE &amp; SECURITY
        </Button>

        <Typography variant="body2" color="text.secondary">
          Cookies/Local Storage: are files with small amount of data, which may include an anonymous unique identifier. Cookies/Local Storage are sent to your
          browser from a web site and stored on your computer's hard drive. Like many sites, we use "cookies/local storage " to collect information. You can
          instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies/local storage, you may
          not be able to use some portions of our Site. Security: The security of your Personal Information is important to us and comes first in our design and
          development, but remember that no method of transmission over the Internet, or any method of electronic storage, is 99.9% secure. While we strive to
          use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </Typography>

        <Button size="large" color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          DATA DELETION INSTRUCTION
        </Button>

        <Typography variant="body2" color="text.secondary">
          We only use Email for authentication (Signin purpose only) across social platforms(Twitter, Facebook and Google). To maintain a highly competitive
          online gaming experience, after a certain period of inactivity (currently 21 days) on our site, your profile and its data will be deleted by one of
          our moderators, with no way to recover your account.
        </Typography>

        <Button size="large" color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          CHANGES TO TERMS OF USE AND CONDITIONS
        </Button>

        <Typography variant="body2" color="text.secondary">
          This Terms of use and Conditions is effective as of Sunday, 24th May 2020 and will remain in effect except with respect to any changes in its
          provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right, at our sole discretion, to
          modify, update or replace these Terms and Policy at any time and you should check the Terms and Policy periodically though we might send a “policy or
          terms update notification to your mail”. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
          effect. What constitutes a material change will be determined at sole discretion. Your continued use of the Service after we post any modifications to
          the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified
          Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or
          by placing a prominent notice on our website.
        </Typography>

        <Button size="large" color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
          SOCIAL PROVIDER
        </Button>

        <Typography variant="body2" color="text.secondary">
          For a secure and reliable method to ensure account safety, we've utilized a modern way of passwordless authentication (Signin purpose only) using
          either your Facebook, Twitter or Google account. When we authenticate a user, we do not ask for any data, other than your email address, which will be
          used to check if an account exists already in our database.
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default Privacy;
