import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";

import { styles } from ".";

const Footer = ({ logoutHandler, social }: any) => (
  <div className={styles.footer}>
    <footer>
      <main>
        <aside>
          <Typography variant="h5" component="h1">
            SoccerMASS
          </Typography>
          <Image src="/images/soccermass.webp" alt="SoccerMASS" width={80} height={80} />

          <Typography variant="subtitle2">Follow US</Typography>

          <div>
            {social.map(([social, link = "https://viewcrunch.com/"]) => (
              <a href={link} key={social} rel="noopener noreferrer">
                <Image src={`/images/social/${social.toLowerCase()}.png`} alt={`SoccerMASS ${social} page`} width={30} height={30} />
              </a>
            ))}
          </div>
        </aside>

        <nav>
          <div>
            <label htmlFor="company">Company</label>
            <a href="https://viewcrunch.com/organization" rel="noopener noreferrer">
              ViewCrunch
            </a>
            <a href="https://soccermass.com/" rel="noopener noreferrer">
              SoccerMASS
            </a>
            <a href="https://alienforest.com/" rel="noopener noreferrer">
              AlienForest
            </a>
          </div>
          <div>
            <label htmlFor="Pages without auth">SoccerMASS</label>
            <Link href="/">Home</Link>
            <Link href="/apihub">API HUB</Link>
            <Link href="/manager">Manager</Link>
            <Link href="/auth">Signin/Signup</Link>
            {/* <Link href="/auth/signup"></Link> */}
            <Link href="/auth/reset">Reset Password</Link>
            {/* <a HREF="/">Logouts</a> */}
            <Link href="/auth/signin" onClick={logoutHandler}>
              Logout
            </Link>
            {/* onClick={logoutHandler} */}
          </div>
          <div>
            <label htmlFor="info">Info</label>
            <Link href="/info/privacy/">Privacy Policy</Link>
            {/* <Link href="/info/contact/">Contact US</Link> */}
            <a href="https://chukwuemeka.vercel.app/" target="_blank" rel="noopener noreferrer">
              Contact US
            </a>
            <Link href="/info/terms/">Terms &amp; Conditions</Link>
            <Link href="/info/advertise/">Advertise</Link>
            <Link href="/info/donate/">Support/Donation</Link>
            {/* proundly hosted on Vercel && Render */}
          </div>
        </nav>
      </main>

      <section>
        <Typography component="span" variant="body2">
          ● All rights reserved. All trademarks are the property of their respective owners ●
        </Typography>
        <Typography component="span" variant="body2">
          ©SoccerMASS 2018 ~ {new Date().getFullYear()}
        </Typography>
      </section>
    </footer>
  </div>
);

export default Footer;
