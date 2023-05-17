import { Card, CardContent, Typography, Divider } from "@mui/material";

export default () => (
  <Card sx={{ maxWidth: 1200, width: "calc(100% - 20px)", mx: "auto", my: 2 }}>
    <CardContent>
    <Typography gutterBottom variant="h5" component="h1" textAlign="center">

        Terms and Conditions
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please read these Terms of Use and Conditions carefully before using the service at https://www.soccermass.com which is operated by SoccerMASS. Your
        access to and use of the Service is conditioned on your acceptance (<b>REGISTRATION/SIGN UP</b>) of and compliance with these Terms. These Terms apply
        to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree
        with any part of the terms then you may not access the Service.
      </Typography>
      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        PURCHASES
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The primary intention of developing SoccerMASS is to create an engaging blog that would cost users nothing, having said that, SoccerMASS has no
        intention of making this website paid, i.e. the service will remain free at all cost amid constant improvement for its entirety, though we accept
        donations, we also incorporated Ads as a way to the gain/get funds to keep our service running 24/7 at full speed and accessible to everyone from every
        race, religion etc. SoccerMASS will never ask you to pay any amount to use any portion of our service at any time or for anything. If you wish to
        purchase any product or service made available through the Ads on this website, you may be asked to supply certain information relevant to your
        Purchase; SoccerMASS bears no attachment and no responsibility of what you choose to do on any ad network and would not be held liable for your actions
        as stated above Ads were added as way to generate funds.
      </Typography>
      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        TERMINATION
      </Typography>
      <Typography variant="body2" color="text.secondary">
        We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms of use and Conditions. All provisions of the Terms of Use and Conditions which by their nature should survive
        termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.
      </Typography>
      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        CONTENT
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other Content so far you
        link back to the portion/page on this website you intend using. You are responsible for whatsoever you do with this content.
      </Typography>
      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        LINKS TO OTHER WEB SITES
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Our Service may contain links to third-party web sites or services that are not owned or controlled by SoccerMASS including the ad network. As such
        SoccerMASS has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
        You further acknowledge and agree that SoccerMASS shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged
        to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
      </Typography>
      <Typography color="primary" sx={{ display: "inline-block", ml: -1.5, mt: 3 }}>
        CHANGES TO TERMS OF USE AND CONDITIONS
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This Terms of use and Conditions is effective as of Sunday, 8th December 2019 and will remain in effect except with respect to any changes in its
        provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right, at our sole discretion, to modify,
        update or replace these Terms and Policy at any time and you should check the Terms and Policy periodically though we might send a “policy or terms
        update notification to your mail”. 
        
        <Divider sx={{ my: 3 }} />

        If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
        constitutes a material change will be determined at sole discretion. Your continued use of the Service after we post any modifications to the Privacy
        Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If
        we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent
        notice on our website.
      </Typography>
    </CardContent>
  </Card>
);
