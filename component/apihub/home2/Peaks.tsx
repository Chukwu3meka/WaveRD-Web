import { Typography } from "@mui/material";

import { peaksStyles } from ".";
import Link from "next/link";
import Image from "next/image";

const Peaks = () => {
  return (
    <div className={peaksStyles.peaks}>
      <section className={peaksStyles.withoutImage}>
        <main>
          <Typography>Shift your focus to UI/UX</Typography>
          <Typography textAlign="justify">
            Great first impressions lead to lasting relationships, that’s why we make it easy to put your best in app logi and UI while we focus on the data
            side of things. Quickly customize your API with players, clubs, photos, schedules, leagues, and more to make your site a place users love to visit
            over and over again.
          </Typography>
          <Link href={"/link"}>See all features</Link>
        </main>
      </section>

      <section className={peaksStyles.rightImage}>
        <main>
          <Typography>Create robust App</Typography>
          <Typography textAlign="justify">
            If you can send an email, you can have an API connected website. Click and update content in an instant. Drag-and-drop stats, schedules, news, and
            other API wherever you want. Look like a professional webmaster without a data worries.
          </Typography>
          <Link href={"/link"}>See all features</Link>
        </main>

        <figure>
          <Image
            src="/images/layout/apihub-right-peak.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </figure>
      </section>

      <section className={peaksStyles.leftImage}>
        <figure>
          <Image
            src="/images/layout/apihub-left-peak.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </figure>

        <main>
          <Typography>Massive data to fetch</Typography>
          <Typography textAlign="justify">
            Have more than one team? You’ll need more than one API. Quickly create and customize separate pages for all your squads so users can have fast
            access to schedules, news, stats, scores, and more.
          </Typography>
          <Link href={"/link"}>See all features</Link>
        </main>
      </section>

      {/* <section className={peaksStyles.withoutImage}>
        <main>
          <Typography>Improve Performance</Typography>
          <Typography textAlign="justify">
            We’ll make you look good. Select from dozens of stunning sports-API to begin creating a truly unique sports app for your organization.
          </Typography>
          <Link href={"/link"}>See all features</Link>
        </main>
      </section> */}
    </div>
  );
};

export default Peaks;
