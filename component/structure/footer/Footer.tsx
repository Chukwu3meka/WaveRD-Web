import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";
import { IFooter } from "@interface/main/footer-interface";
import thirdPartyAccounts from "@source/constants/thirdPartyAccounts";

const Footer = ({ logoutHandler, authenticated }: IFooter) => (
  <div className={styles.footer}>
    <Fade direction="right">
      <footer>
        <main>
          <aside>
            <Typography fontWeight={700} fontSize="2.2em" component="h1">
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
              {thirdPartyAccounts.map(([accounts, link = "https://soccermass.com/"]) => (
                <a href={link} key={accounts} rel="noopener noreferrer" target="_blank">
                  <Image src={`/images/social/${accounts.toLowerCase()}.png`} alt={`SoccerMASS ${accounts} page`} width={30} height={30} />
                </a>
              ))}
            </div>
          </aside>

          <nav>
            <div>
              <label htmlFor="soccermass-links">SoccerMASS</label>
              <Link href="/">Home</Link>
              {/* {authenticated && (
                <Link href="/profile/subscriptions" onClick={logoutHandler()}>
                Subscriptions
                </Link>
              )} */}
              <Link href="/auth/reset">Password Reset</Link>
              <a href="https://github.com/SoccerMASS-Inc/SoccerMASS-Web/issues" rel="noopener noreferrer" target="_blank">
                Bug Report
              </a>
              {authenticated && (
                <a
                  href={
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:5000/api/accounts/personal/logout"
                      : "https://accounts.soccermass.com/api/personal/logout"
                  }
                  rel="noopener noreferrer"
                  target="_blank">
                  Logout
                </a>
              )}
              {!authenticated && <Link href="/auth/signin">Login/Register</Link>}
              <Link href="/auth/reset">Organization</Link>
            </div>

            <div>
              <label htmlFor="info">Learn More</label>
              <Link href="/info/advertise/">Advertise</Link>
              <Link href="/info/terms/">Terms &amp; Conditions</Link>
              <Link href="/info/contact/">Contact Us</Link>
              <Link href="/info/donate/">Support/Donation</Link>
              <Link href="/info/privacy/">Privacy Policy</Link>
            </div>

            <div>
              <label htmlFor="company">Domains</label>
              <a href="https://blog.soccermass.com/">Blogs</a>
              <a href="https://space.soccermass.com/">Homes & Space</a>
              <a href="https://jobs.soccermass.com/">Hourly Jobs</a>
              <a href="https://manager.soccermass.com/">Soccer Manager</a>
              <a href="https://apihub.soccermass.com/">API Hub</a>
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

export default Footer;
