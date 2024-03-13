import pageInfo from "utils/page-info";

import { Metadata } from "next";
import { Intro, Peaks } from "components/apihub/home";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const LayoutHomePage = () => (
  <main>
    <Intro />
    <Peaks />
  </main>
);

export default LayoutHomePage;
