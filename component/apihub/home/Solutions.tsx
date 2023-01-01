import Link from "next/link";
import Typography from "@mui/material/Typography";

import { ImageText, styles } from ".";

const SectionTwo = () => (
  <>
    <ImageText
      title="Shift your focus to UI/UX"
      body="Great first impressions lead to lasting relationships, that’s why we make it easy to put your best in app logi and UI while we focus on the data side of things. Quickly customize your API with players, clubs, photos, schedules, leagues, and more to make
      your site a place users love to visit over and over again."
      link="/documentation"
    />
    <ImageText
      title="Create robust App"
      body="If you can send an email, you can have an API connected website. Click and update content in an instant. Drag-and-drop stats,
    schedules, news, and other API wherever you want. Look like a professional webmaster without a data worries."
      src="/images/layout/homePage3.png"
      link="/documentation"
    />
    <ImageText
      reverse
      title="Improve Performance"
      body="We’ll make you look good. Select from dozens of stunning sports-API to begin creating a truly unique sports app for your organization."
      src="/images/layout/homePage2.png"
      link="/documentation"
    />
    <ImageText
      title="Massive data to fetch"
      body="Have more than one team? You’ll need more than one API. Quickly create and customize separate pages for all your squads so users
      can have fast access to schedules, news, stats, scores, and more."
      src="/images/layout/homePage4.png"
      link="/documentation"
    />
  </>
);

export default SectionTwo;
