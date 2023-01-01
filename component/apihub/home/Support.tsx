import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styles } from ".";

const Support = () => (
  <section id={styles.sectionSeven}>
    <main>
      <Typography>Unlimited access to helpful resources</Typography>
      <Typography>Get the support you need when you need it from our trusted sports technology experts.</Typography>
      <div>
        <Paper elevation={2}>
          <Image width={135} height={120} alt="" src="/images/apihub/customerCare.png" />
          <div>
            <Typography component="h3" variant="h6">
              Customer help center
            </Typography>
            <Typography variant="body2">
              Access helpful articles, videos, and resources at any time to help you get the most from SportsEngine HQ.
            </Typography>
          </div>
        </Paper>
        <Paper elevation={2}>
          <Image width={135} height={120} alt="" src="/images/apihub/247.png" />
          <div>
            <Typography component="h3" variant="h6">
              Dedicated 24/7
            </Typography>
            <Typography variant="body2">
              Soccer Atlas subscribers are provided a dedicated onboarding coach to ensure a fast and efficient setup.
            </Typography>
          </div>
        </Paper>
        <Paper elevation={2}>
          <Image width={135} height={120} alt="" src="/images/apihub/techSupport.png" />
          <div>
            <Typography component="h3" variant="h6">
              Live tech support
            </Typography>
            <Typography variant="body2">
              Getting the answer to your question is always just a click away — our team of experts is ever ready to help.
            </Typography>
          </div>
        </Paper>
      </div>
    </main>
  </section>
);

export default Support;
