import { Metadata } from "next";
import pageInfo from "utils/page-info";
import Footer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import { ApiHub, ManagerContainer, WelcomeContainer } from "components/home";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default function HomePage() {
  return (
    <main>
      <HeaderContainer position="relative" />
      <WelcomeContainer />
      <ManagerContainer />
      <ApiHub />
      <Footer />
    </main>
  );
}
