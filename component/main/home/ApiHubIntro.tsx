import Link from "next/link";
import Image from "next/image";
import { Paper, Button, Typography } from "@mui/material";

import { apiHubIntroStyles } from ".";

const ApiHubIntro = () => (
  <div className={apiHubIntroStyles.apihub}>
    <div>
      <main>
        {/* <Typography>{title}</Typography>
      <Typography textAlign="justify">{body} </Typography> */}
        <Link href="/apihub">See all features</Link>
      </main>
      <figure>{/* <Image src="/images/layout/intro-clubs.jpg" alt="" layout="fill" /> */}</figure>
    </div>
  </div>
);

export default ApiHubIntro;
