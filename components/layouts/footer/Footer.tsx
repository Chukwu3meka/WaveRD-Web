"use client";

import { styles } from ".";
import Link from "next/link";
import Image from "next/image";
import pageInfo from "utils/page-info";
import { Typography } from "@mui/material";
import { SOCIAL_ACCOUNTS } from "utils/constants";

export default function Footer() {
  return (
    <div className={styles.footer} style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <footer>
        <main>
          <aside>
            <Typography fontWeight={700} fontSize="2.2em" component="h1" color="text.secondary">
              SoccerMASS
            </Typography>

            <Image src="/images/layout/soccermass.webp" alt="SoccerMASS" width={80} height={80} placeholder="blur" blurDataURL="/images/layout/soccermass.webp" />

            <Typography variant="subtitle2">Follow US</Typography>

            <div>
              {SOCIAL_ACCOUNTS.map(({ title, id, href, image }) => (
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

              <a href="https://blog.soccermass.com/">Blog</a>
              <Link href="/organization">Organization</Link>
              <Link href={pageInfo.passwordReset.path}>Forgot Password</Link>
              <Link href={pageInfo.advertisement.path}>Advertisement</Link>
              <a href="https://github.com/SoccerMASS-Inc/SoccerMASS-Web/issues" rel="noopener noreferrer" target="_blank">
                Bug Report
              </a>
            </div>

            <div>
              <Typography component="label" htmlFor="soccermass-links" color="text.secondary">
                Learn More
              </Typography>

              <Link href={pageInfo.contactUs.path}>Contact Us</Link>
              <Link href={pageInfo.termsAndCondition.path}>Terms &amp; Conditions</Link>
              <Link href={pageInfo.privacyPolicy.path}>Privacy Policy</Link>
              <Link href={pageInfo.faq.path}>Freq. Asked Questions</Link>
              <Link href={pageInfo.dataDeletion.path}>Data Deletion</Link>
            </div>

            <div>
              <Typography component="label" htmlFor="soccermass-links" color="text.secondary">
                Partners
              </Typography>

              <a href="https://apihub.soccermass.com/">API Hub</a>
              <a href="https://translate.soccermass.com/">Translastion</a>
              <a href="https://manager.soccermass.com/">Soccer Manager</a>
              <a href="https://soccermass.com/">Jobs & Career</a>
              <a href="https://soccermass.com/">Agriculture</a>
              {/* <a href="https://soccermass.com/">Homes & Space</a> */}
              {/* <a href="https://soccermass.com/">Hourly Jobs</a> */}
            </div>
          </nav>
        </main>

        <section>
          <Typography component="span" variant="body2" fontSize=".8em" color="text.secondary">
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

          <Typography component="span" variant="body2" fontSize=".8em" color="text.secondary">
            ● All rights reserved. All trademarks are the property of their respective owners ●
          </Typography>

          <Typography component="span" variant="body2" fontSize="1em">
            ©SoccerMASS 2018 ~ {new Date().getFullYear()}
          </Typography>
        </section>
      </footer>
    </div>
  );
}
