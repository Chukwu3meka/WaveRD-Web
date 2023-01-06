import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";
import { IFooter } from "@interface/main/footer-interface";

const Footer = ({ logoutHandler, thirdPartyAccounts }: IFooter) => (
  <Fade direction="right">
    <div className={styles.footer}>
      <footer>
        <main>
          <aside>
            <Typography fontWeight={700} fontSize="1.8em" component="h1">
              SoccerMASS
            </Typography>
            <Image src="/images/soccermass.webp" alt="SoccerMASS" width={80} height={80} placeholder="blur" blurDataURL="/images/soccermass.webp" />

            <Typography variant="subtitle2">Follow US</Typography>

            <div>
              {thirdPartyAccounts.map(([accounts, link = "https://viewcrunch.com/"]) => (
                <a href={link} key={accounts} rel="noopener noreferrer">
                  <Image src={`/images/social/${accounts.toLowerCase()}.png`} alt={`SoccerMASS ${accounts} page`} width={30} height={30} />
                </a>
              ))}
            </div>
          </aside>

          <nav>
            <div>
              <label htmlFor="info">Info</label>
              <Link href="/info/privacy/">Privacy Policy</Link>
              <Link href="/info/contact/">Contact US</Link>
              <Link href="/info/terms/">Terms &amp; Conditions</Link>
              <Link href="/info/advertise/">Advertise</Link>
              <Link href="/info/donate/">Support/Donation</Link>
            </div>

            <div>
              <label htmlFor="soccermass-links">SoccerMASS</label>
              <Link href="/">Home</Link>
              <Link href="/apihub">API HUB</Link>
              <Link href="/manager">Manager</Link>
              <Link href="/auth">Signin/Signup</Link>
              <Link href="/auth/reset">Reset Password</Link>
              <Link href="/auth/signin" onClick={logoutHandler()}>
                Logout
              </Link>
            </div>

            <div>
              <label htmlFor="company">Company</label>
              <a href="https://viewcrunch.com/" rel="noopener noreferrer">
                ViewCrunch
              </a>
              <a href="https://soccermass.com/" rel="noopener noreferrer">
                SoccerMASS
              </a>
              <a href="https://alienforest.com/" rel="noopener noreferrer">
                AlienForest
              </a>
            </div>
          </nav>
        </main>
        <section>
          <Typography component="span" variant="body2" fontSize=".7em">
            Proudly hosted on&nbsp;
            <a href="https://vercel.com/" rel="noopener noreferrer">
              Vercel
            </a>
            &nbsp;&&nbsp;
            <a href="https://render.com/" rel="noopener noreferrer">
              Render
            </a>
          </Typography>
          <Typography component="span" variant="body2" fontSize=".8em">
            ● All rights reserved. All trademarks are the property of their respective owners ●
          </Typography>
          <Typography component="span" variant="body2" fontSize=".7em">
            ©SoccerMASS 2018 ~ {new Date().getFullYear()}
          </Typography>
        </section>
      </footer>
    </div>
  </Fade>
);

export default Footer;
