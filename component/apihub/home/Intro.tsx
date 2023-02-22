import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { introStyles } from ".";
import Link from "next/link";

const SectionOne = () => (
  <section id={introStyles.sectionOne}>
    {/* <main>
      <Typography color="whitesmoke">ONLINE FOOTBALL API</Typography>
      <Typography color="whitesmoke">Connect with your community</Typography>
      <Typography color="whitesmoke">
        Showcase your unique brand and engage with local families through a bold and easy-to-manage API.
      </Typography>
      <Link href="/documentation">
        <Button size="large" variant="contained" color="success">
          Start Building
        </Button>
      </Link>
    </main>
    <figure>
      <Image src="/images/apihub/homePage1.png" alt="Soccer Atlas home" layout="fill" />
    </figure> */}
  </section>
);

export default SectionOne;
