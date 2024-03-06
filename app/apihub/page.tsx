import { Metadata } from "next";
import pageInfo from "utils/page-info";
import Footer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import { ApiHub, ManagerContainer, Welcome } from "components/home";
import { sleep } from "utils/helpers";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default async function HomePage() {
  return (
    <main>
      <p>hehehe</p>{" "}
    </main>
  );
}
