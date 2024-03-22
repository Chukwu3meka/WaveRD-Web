import { Metadata } from "next";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

const HomePage = async () => (
  <main>
    <p>SoccerMASS Game</p>
  </main>
);

export default HomePage;
