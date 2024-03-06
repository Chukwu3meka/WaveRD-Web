import { Metadata } from "next";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function HomePage() {
  return (
    <main>
      <p>SoccerMASS Game</p>
    </main>
  );
}
