import { apiHubIntroStyles } from ".";

import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
