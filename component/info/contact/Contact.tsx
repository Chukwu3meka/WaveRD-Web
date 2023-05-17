import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";
import socialAccounts from "@source/constants/socialAccounts";

export default () => (
  <div className={`xOverflowHidden ${styles.footer}`}>
    <Fade direction="right">
      <footer>
        <main>
          <aside>
            <Typography fontWeight={700} fontSize="2.2em" component="h1" color="text.secondary">
              SoccerMASS
            </Typography>

            <Image
              src="/images/layout/soccermass.webp"
              alt="SoccerMASS"
              width={80}
              height={80}
              placeholder="blur"
              blurDataURL="/images/layout/soccermass.webp"
            />

            <Typography variant="subtitle2">Follow US</Typography>

            <div>
              {socialAccounts.map(({ title, id, href, image }) => (
                <a href={href} key={id} rel="noopener noreferrer" target="_blank">
                  <Image src={image} alt={`SoccerMASS ${title} page`} width={30} height={30} />
                </a>
              ))}
            </div>
          </aside>

          <nav>
            <div>
              <Typography component="label" htmlFor="soccermass-links" color="text.secondary">
                SoccerMASS
              </Typography>

              <Link href="/">Home</Link>
              <a href="https://github.com/SoccerMASS-Inc/SoccerMASS-Web/issues" rel="noopener noreferrer" target="_blank">
                Bug Report
              </a>
              <Link href="/accounts/forgot-password">Forgot Password</Link>
              <Link href="/organization">Organization</Link>
              <a href="https://apihub.soccermass.com/">API Hub</a>
            </div>

            <div>
              <Typography component="label" htmlFor="soccermass-links" color="text.secondary">
                Learn More
              </Typography>

              <Link href="/info/advertise/">Advertise</Link>
              <Link href="/info/cookie/">Cookie Policy</Link>
              <Link href="/info/terms/">Terms &amp; Conditions</Link>
              <Link href="/info/privacy/">Privacy Policy</Link>
              <Link href="/info/contact/">Contact Us</Link>
            </div>

            <div>
              <Typography component="label" htmlFor="soccermass-links" color="text.secondary">
                Coming Soon
              </Typography>

              <a href="https://blog.soccermass.com/">Blog</a>
              <a href="https://translate.soccermass.com/">Translation</a>
              <a href="https://manager.soccermass.com/">Soccer Manager</a>
              <a href="https://soccermass.com/">Homes & Space</a>
              <a href="https://soccermass.com/">Hourly Jobs</a>
            </div>
          </nav>
        </main>

        <section>
          <Typography component="span" variant="body2" fontSize=".8em">
            Powered with 💗 by&nbsp;
            <a href="https://mongodb.com/" rel="noopener noreferrer" target="_blank">
              MongoDB
            </a>
            ,&nbsp;
            <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">
              Vercel
            </a>
            &nbsp;&&nbsp;
            <a href="https://render.com/" rel="noopener noreferrer" target="_blank">
              Render
            </a>
          </Typography>

          <Typography component="span" variant="body2" fontSize=".9em">
            ● All rights reserved. All trademarks are the property of their respective owners ●
          </Typography>

          <Typography component="span" variant="body2" fontSize="1em">
            ©SoccerMASS 2018 ~ {new Date().getFullYear()}
          </Typography>
        </section>
      </footer>
    </Fade>
  </div>
);
